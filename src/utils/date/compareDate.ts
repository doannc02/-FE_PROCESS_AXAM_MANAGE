export default function compareTimes(time1: string, time2: string) {
  const date1 = new Date(time1)
  const date2 = new Date(time2)

  if (date1.getTime() > date2.getTime()) {
    return 1 // time1 lớn hơn time2
  } else if (date1.getTime() < date2.getTime()) {
    return -1 // time1 nhỏ hơn time2
  } else {
    return 0 // time1 bằng time2
  }
}
