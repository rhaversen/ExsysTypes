// Helper types
export interface Time {
	hour: number
	minute: number
}

export interface OrderWindow {
	from: Time
	to: Time
}

// Product types
export interface GetProductType {
	_id: string
	name: string
	price: number
	orderWindow: OrderWindow
	options: GetOptionType[]
	imageURL?: string
	createdAt: string
	updatedAt: string
}

export interface PostProductType {
	name: string
	price: number
	orderWindow: OrderWindow
	options: Array<GetOptionType['_id']>
	imageURL?: string
}

export interface PatchProductType {
	name?: string
	price?: number
	orderWindow?: OrderWindow
	options?: Array<GetOptionType['_id']>
	imageURL?: string
}

// Option types
export interface GetOptionType {
	_id: string
	name: string
	price: number
	imageURL?: string
	createdAt: string
	updatedAt: string
}

export interface PostOptionType {
	name: string
	price: number
	imageURL?: string
}

export interface PatchOptionType {
	name?: string
	price?: number
	imageURL?: string
}

// Activity types
export interface GetActivityType {
	_id: string
	roomId: GetRoomType | null
	name: string
	createdAt: string
	updatedAt: string
}

export interface PostActivityType {
	roomId?: GetRoomType['_id'] | null
	name: string
}

export interface PatchActivityType {
	roomId?: GetRoomType['_id'] | null
	name?: string
}

// Room types
export interface GetRoomType {
	_id: string
	name: string
	description: string
	createdAt: string
	updatedAt: string
}

export interface PostRoomType {
	name: string
	description: string
}

export interface PatchRoomType {
	name?: string
	description?: string
}

// Order types
export interface GetOrderType {
	_id: string
	products: Array<{ _id: GetProductType['_id'], name: string, quantity: number }>
	options: Array<{ _id: GetOptionType['_id'], name: string, quantity: number }>
	activityId: GetActivityType['_id']
	status: 'pending' | 'confirmed' | 'delivered'
	createdAt: string
	updatedAt: string
}

export interface PostOrderType {
	products: Array<{ id: GetProductType['_id'], quantity: number }>
	options?: Array<{ id: GetOptionType['_id'], quantity: number }>
	activityId: GetActivityType['_id']
	kioskId: GetKioskType['_id']
	checkoutMethod: 'sumUp' | 'later' | 'mobilePay'
}

export interface PatchOrderType {
	orderIds: Array<GetOrderType['_id']>
	status: 'pending' | 'confirmed' | 'delivered'
}

// Reader types
export interface GetReaderType {
	_id: string
	readerTag: string
	createdAt: string
	updatedAt: string
}

export interface PostReaderType {
	readerTag?: string
	pairingCode: string
}

export interface PatchReaderType {
	readerTag?: string | null
	pairingCode?: string
}

// Admin types
export interface GetAdminType {
	_id: string
	name: string
	createdAt: string
	updatedAt: string
}

export interface PostAdminType {
	name: string
	password: string
}

export interface PatchAdminType {
	name?: string
	password?: string
}

// Kiosk types
export interface GetKioskType {
	_id: string
	name: string
	kioskTag: string
	readerId: GetReaderType | null
	activities: GetActivityType[]
	createdAt: string
	updatedAt: string
}

export interface PostKioskType {
	name: string
	kioskTag?: string
	password: string
	readerId?: GetReaderType['_id']
	activities: Array<GetActivityType['_id']>
}

export interface PatchKioskType {
	name?: string
	kioskTag?: string | null
	password?: string
	readerId?: GetReaderType['_id'] | null
	activities?: Array<GetActivityType['_id']>
}

// Session types
export interface GetSessionType {
	_id: string // Used for deletion, determining current session and key in list
	sessionExpires: string | null // Used to determine if session is expired if stayLoggedIn is true (Uses rolling expiration) (ISO string)
	stayLoggedIn: boolean // Used to determine if session is persistent
	type: 'admin' | 'kiosk' | 'unknown' // Used to infer user information
	userId: GetAdminType['_id'] | GetKioskType['_id'] | null // Used to infer user information
	ipAddress: string // Ip address of the user
	loginTime: string // Time of login (ISO string)
	lastActivity: string // Time of last activity (ISO string)
	userAgent: string // Agent information
}
