import { HTTP_METHODS } from '../../../../services'
import { getActivityByCodeUrlExternal } from '../../../../services/activityServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getActivityByCode(req, res) {
  const {
    query: { code, machineCode },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: getActivityByCodeUrlExternal(code),
  })

  if (data != null) {
    const { activity } = data
    const fields = Object.entries(data.fields).reduce((acc, [key, array]) => {
      return {
        ...acc,
        [key]: array.reduce((acc, value) => {
          const { id, name } = value
          return { ...acc, [id]: name }
        }, {}),
      }
    }, {})
    return res.json({ fields, activity })
  }

  return res.status(status).json({ message })
}
