import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import {
  editActivityConfig,
  getActivityByCodeUrlRegular,
} from '../../../services/activityServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import ActivityForm from '../../../components/activities/ActivityForm'
import EditActivityForm from '../../../components/activities/machine/edit-activity/EditActivityForm'

export default function EditActivity({ code, machineCode, message, ...props }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Actividad ${code}`, 'Editar'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>{component}</>
      ) : (
        <ActivityForm
          {...editActivityConfig(code)}
          code={code}
          initialValues={{ ...props, machineCode }}
          title={title}
        >
          <EditActivityForm />
        </ActivityForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code, machineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: getActivityByCodeUrlRegular(code),
  })

  return { props: { ...data, code, machineCode, message } }
}
