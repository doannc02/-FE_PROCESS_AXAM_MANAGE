import CoreInput from "@/components/atoms/CoreInput";
import { TopAction } from "@/components/molecules/TopAction";
import Image from "next/image";
import { NextRouter } from "next/router";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import nineDots from "@/assets/svg/DotsThreeOutlineVertical.svg"
const reorder = (list: any, startIndex: number, endIndex: number) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
};

export default function SalaryTemplateColumns({ index, router }: { index: number, router: NextRouter }) {
    const methods = useFormContext()
    const { control, setValue, getValues } = methods

    const { fields, remove } = useFieldArray({
        control,
        name: `salaryTemplateColumns.${index}.groupSalaryColumnItems`,
        keyName: "groupSalaryColumnItemId"
    })


    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            fields,
            result.source.index,
            result.destination.index
        );

        setValue(`salaryTemplateColumns.${index}.groupSalaryColumnItems`, newItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided): JSX.Element => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >  {fields.map((item: any, index2: number) => {
                        return <Draggable key={item.code} draggableId={item.code} index={index2}>
                            {(provided) => {

                                return <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="active:bg-[#f5abb3]  w-[400px] flex items-center gap-2 rounded-sm"
                                >
                                    <Image src={nineDots} alt="" width={35} height={25} />
                                    <div className={`flex items-center p-4 mb-1 cursor-pointer`} >
                                        <div className="flex justify-between">
                                            <CoreInput
                                                control={control}
                                                name={`salaryTemplateColumns.${index}.groupSalaryColumnItems.${index2}.code`}
                                                isViewProp={true}
                                                label="Mã cột lương"
                                            />
                                            <CoreInput
                                                control={control}
                                                name={`salaryTemplateColumns.${index}.groupSalaryColumnItems.${index2}.name`}
                                                isViewProp={true}
                                                label="Tên cột lương"
                                            />
                                        </div>
                                        {!router.query.actionType && < TopAction
                                            isShowText={false}
                                            actionList={["delete"]}
                                            onDeleteAction={() => {
                                                remove(index2)
                                            }
                                            }
                                        />}
                                    </div>
                                </div>
                            }}
                        </Draggable>
                    })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )

}
