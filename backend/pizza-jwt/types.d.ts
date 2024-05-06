import { RowDataPacket } from 'mysql2'

interface CustomerRoleId extends RowDataPacket {
   customer_role_id: number
}

interface CustomerRole extends RowDataPacket {
   customer_role_id: number
   role_name: 'USER' | 'ADMIN' | 'DEMO'
}

interface CustomerRoleRepository {
   existById: (id: number) => Promise<CustomerRoleId[]>
   geByCustomerRoleId: (id: number) => Promise<CustomerRole[]>
   save: (id: number) => Promise<void>
   initializeTestContainersSetUp: () => Promise<void>
}
