import { BasicLayout } from "@/components/layouts/WrapLayout/BasicLayout";
import { Meta } from "@/components/meta";
import SalaryColumn from "@/components/templates/Accounting/SalaryManagement/SalaryColumn/index.";
import { HttpResponse } from "@/lib/api";
import { NextPageWithLayout } from "@/lib/next/types";
import { TRANSLATE } from "@/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SalaryColumn />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: "Quản lý cột lương" }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                TRANSLATE.COMMON,
                TRANSLATE.SALARY_MANAGEMENT
            ]))
        }
    }
}

export default Page