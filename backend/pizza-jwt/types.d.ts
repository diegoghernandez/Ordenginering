import { RowDataPacket } from 'mysql2'

interface SelectOne extends RowDataPacket {
	1: number
}

interface CustomerRoleId extends RowDataPacket {
	customer_role_id: number
}

interface CustomerRole extends RowDataPacket {
	customer_role_id: number
	role_name: 'USER' | 'ADMIN' | 'DEMO'
}

interface CustomerRoleRepository {
	databaseIsAvailable: () => Promise<boolean>
	existById: (id: number) => Promise<boolean>
	geByCustomerRoleId: (id: number) => Promise<CustomerRole[]>
	save: (id: number) => Promise<void>
	initializeTestContainersSetUp: () => Promise<void>
}

interface CustomerMessage {
	#onSaveCustomerRole: () => Promise<void>
}
