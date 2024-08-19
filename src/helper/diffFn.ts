import _ from 'lodash'

export const diffFn: any = (a: any, b: any, path = '') =>
  _.reduce(
    a,
    (result: any, value, key) => {
      if (_.isObjectLike(value)) {
        if (_.isEqual(value, b[key])) {
          return result
        } else {
          return result.concat(
            diffFn(value, b[key], path ? `${path}.${key}` : key)
          )
        }
      } else {
        return _.isEqual(value, b[key])
          ? result
          : result.concat(path ? `${path}.${key}` : key)
      }
    },
    []
  )

export const compareObjectFn = (a: any, b: any) => {
  const diffKeys1 = diffFn(a, b)
  const diffKeys2 = diffFn(b, a)

  const diffKeys = _.union(diffKeys1, diffKeys2)
  const res = {}

  _.forEach(diffKeys, (key: any) =>
    _.assign(res, {
      [key]: { old: _.get(a, key), new: _.get(b, key) },
    })
  )
  return res
}

export const chunkFn = (arr: any[]) => {
  const res = []
  for (var i = 0; i < arr.length - 1; i++) {
    var doi = [arr[i], arr[i + 1]]
    res.push(doi)
  }

  return res
}
