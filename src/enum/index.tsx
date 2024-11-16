export const stateEnum = {
  in_progress: 'Đang thực hiện',
  pending_approval: 'Yêu cầu phê duyệt',
  approved: 'Phê duyệt',
  rejected: 'Từ chối',
}

export const stateEnumUser = [
  { in_progress: 'Đang thực hiện' },
  { pending_approval: 'Yêu cầu phê duyệt' },
]



export const menuStateView = [
  { value: 'in_progress', name: 'Đang thực hiện' },
  { value: 'pending_approval', name: 'Yêu cầu phê duyệt' },
  { value: 'approved', name: 'Phê duyệt' },
  { value: 'rejected', name: 'Từ chối' },
]

export const menuStateAdmin = [
  { value: 'approved', name: 'Phê duyệt' },
  { value: 'rejected', name: 'Từ chối' },
]

export const menuStateUser = [
  { value: 'in_progress', name: 'Đang thực hiện' },
  { value: 'pending_approval', name: 'Yêu cầu phê duyệt' },
]
