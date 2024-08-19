import { CoreButton } from "@/components/atoms/CoreButton";
import { useDialog } from "@/components/hooks/dialog/useDialog";
import { CoreDialog } from "@/components/organism/CoreDialog";
import { Box } from "lucide-react";
import React from "react";
import { useDialogDeleteSalaryColumn } from "./useDialogDeleteSalaryColumn";
import { Typography } from "@mui/material";

export default function DialogDeleteSalaryColumn({ id }: { id: { id: number } }) {
    const [values, handles] = useDialogDeleteSalaryColumn(id)
    const { isLoading } = values
    const { onSubmit, t, hideDialog } = handles
    return <CoreDialog title onClose={hideDialog} width={450}>
        <div className='flex justify-center max-w-[350px] m-auto align-middle text-center'>
            <Typography
                variant='subtitle1'
                style={{
                    lineHeight: 1.5,
                }}
            >
                {t('management_salary.child.group_salary.delete')}
            </Typography>
        </div>
        <div className="flex justify-center gap-10 py-10">
            <CoreButton
                theme='cancel'
                onClick={() => {
                    hideDialog()
                }}
            >
                {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
                {t('common:btn.confirm')}
            </CoreButton>
        </div>
    </CoreDialog>
}
