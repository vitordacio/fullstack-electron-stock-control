const permissions = {
  master: true,
  company: true,
  adm: true,
  user: true,
} as const;

declare type AppPermissions = typeof permissions;

const masterPerm = { master: true } as const;
type MasterPerm = typeof masterPerm;

const companyPerm = { company: true } as const;
type CompanyPerm = typeof companyPerm;

const admPerm = { adm: true } as const;
type AdmPerm = typeof admPerm;

const userPerm = { user: true } as const;
type UserPerm = typeof userPerm;
