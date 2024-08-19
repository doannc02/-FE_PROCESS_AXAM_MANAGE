import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import DotThree from "@/components/icons/DotThree";
import { TopAction } from "@/components/molecules/TopAction";
import { TableCellWithBorderBottom, TableCellWithBorderBottomRight, TableCellWithBorderRight, TableContainerCommon, TableHeadCommon } from "@/components/organism/CoreTable";
import PageContainer from "@/components/organism/PageContainer";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import useSalaryTableAction from "./useSalaryTableAction";

export default function SalaryTableAction() {
  const [values, handles] = useSalaryTableAction()
  const { router, getAllHeaderTable, isLoadingGetAllHeaderTable } = values
  const { t } = handles
  console.log(getAllHeaderTable)
  return (
    <PageContainer title={
      <CoreBreadcrumbs
        isShowDashboard
        breadcrumbs={[

          {
            title: t("management_salary.title"),
          },
          {
            title: t("management_salary.child.salary_template.title"),
          }
        ]}
      />
    }>
      <div className='py-4 flex justify-end gap-4 items-center'>
        <TopAction actionList={['import', 'export']} />
        <DotThree className='mt-3' onClick={() => { }} />
      </div>
      <Box>
        <TableContainerCommon
          style={{
            maxHeight: ``,
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHeadCommon>
              <TableRow>
                {getAllHeaderTable.map((item: any, index: number) => (
                  item.salaryColumn ? (
                    <TableCellWithBorderRight style={{
                      minWidth: 150, textAlign: "center"
                    }} rowSpan={2} key={index}>{item.salaryColumn.name}</TableCellWithBorderRight>
                  ) : (
                    <TableCellWithBorderRight style={{
                      minWidth: 150, textAlign: "center"
                    }} key={index} colSpan={item.groupSalaryColumnItems.length}>
                      {item.groupSalaryColumn.name}
                    </TableCellWithBorderRight>
                  )
                ))}
              </TableRow>
              <TableRow>
                {getAllHeaderTable.map((item: any, index: number) => (
                  item.salaryColumn ? null : (
                    item.groupSalaryColumnItems.map((subItem: any, subIndex: number) => (
                      <TableCellWithBorderRight style={{
                        minWidth: 150,
                        textAlign: "center"
                      }} key={`${index}-${subIndex}`}>{subItem.name}</TableCellWithBorderRight>
                    ))
                  )
                ))}
              </TableRow>

            </TableHeadCommon>

            <TableBody>
              <TableRow>
                <TableCellWithBorderRight
                  colSpan={10}
                  variant='body'
                >
                  <div className='flex justify-center min-h-[30px]'>
                    {/* <CircularProgress /> */}
                  </div>
                </TableCellWithBorderRight>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainerCommon>
      </Box>
    </PageContainer>

  );
}
