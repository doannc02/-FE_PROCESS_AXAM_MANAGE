import { CoreButton } from "@/components/atoms/CoreButton";
import { useDialog } from "@/components/hooks/dialog/useDialog";
import UploadBox from "@/components/molecules/UploadBox";
import { UploadFileCustom } from "@/components/molecules/UploadFileCustom";
import UploadImageBox from "@/components/molecules/UploadImageBox";
import { CoreDialog } from "@/components/organism/CoreDialog";
import { TRANSLATE } from "@/routes";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ImportSalaryTable() {
    const { hideDialog } = useDialog()
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    return <CoreDialog title onClose={hideDialog} width={450}>
        <div className='flex justify-center max-w-[350px] m-auto align-middle text-center'>
            <Typography
                variant='h4'
            >
                {/* {t('management_salary.child.salary_template.delete')} */}
                Import
            </Typography>
        </div>
        <div>
            {/* <UploadBox setUrl={() => {}}/> */}

            <UploadImageBox setImage={() => {}}/>
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
            <CoreButton theme='submit'>
                {t('common:btn.confirm')}
            </CoreButton>
        </div>
    </CoreDialog>
}
