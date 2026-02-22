export const userRoles = [
  { label: 'Соискатель', value: 'job-seeker' },
  { label: 'Работодатель', value: 'recruiter' },
];

export const jobTypes = [
  { label: 'Полная занятость', value: 'full-time' },
  { label: 'Частичная занятость', value: 'part-time' },
  { label: 'Контракт', value: 'contract' },
  { label: 'Стажировка', value: 'internship' },
];

export const jobStatuses = [
  { label: 'Открыта', value: 'open' },
  { label: 'Закрыта', value: 'closed' },
  { label: 'Временно закрыта', value: 'paused' },
];

export const jobStatusesClasses: Record<string, string> = {
  open: "py-1 px-3 bg-green-100 text-green-800 border border-green-200 rounded-full w-max uppercase text-xs font-medium",
  closed: "py-1 px-3 bg-red-100 text-red-800 border border-red-200 rounded-full w-max uppercase text-xs font-medium",
  paused: "py-1 px-3 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full w-max uppercase text-xs font-medium",
};

export const statusTypeMap: Record<string, string> = {
    'open': 'Открыта',
    'closed': 'Закрыта',
    'paused': 'Временно закрыта',
};

export const jobTypeMap: Record<string, string> = { 
    'full-time': 'Полная занятость', 
    'part-time': 'Частичная занятость', 
    'contract': 'Контракт', 
    'internship': 'Стажировка',
};

export const experienceLevels = [
  { label: '1-3 года', value: '1-3' },
  { label: '3-5 лет', value: '3-5' },
  { label: '5-7 лет', value: '5-7' },
  { label: '7+ лет', value: '7-100' },
]

export const getAppStatusClass = (status: string) => {
  const commonClasses = 'py-1 px-3 border rounded-full w-max uppercase text-xs font-medium';
  
  switch (status) {
    case 'pending':
      return `${commonClasses} bg-yellow-100 text-yellow-800 border-yellow-500`;
    case 'shortlisted':
      return `${commonClasses} bg-green-100 text-green-800 border-green-500`;
    case 'rejected':
      return `${commonClasses} bg-red-100 text-red-800 border-red-500`;
    default:
      return commonClasses;
  }
};

export const appStatusMap: Record<string, string> = {
  'pending': 'на рассмотрении',
  'shortlisted': 'отобрано',
  'rejected': 'отклонено',
};
export const appStatuses = [
  { label: "На рассмотрении", value: "pending" },
  { label: "Отобрано", value: "shortlisted" },
  { label: "Отклонено", value: "rejected" }
];