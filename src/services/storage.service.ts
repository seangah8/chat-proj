export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

interface EntityId {
    id: string
}

// The EntityId interface ensures that any entity passed to or returned from 
// the generic functions (like query, get, post, etc.) has an id field, 
// which is required for those operations to work correctly 
// (e.g., finding or updating by id).

function query<T extends EntityId>(entityType: string, delay : number = 300): Promise<T[]> {
    const entities: T[] = JSON.parse(localStorage.getItem(entityType)!) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get<T extends EntityId>(entityType: string, entityId: string): Promise<T> {
    const entities = await query<T>(entityType)
    const entity = entities.find(entity_1 => entity_1.id === entityId)
    if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
}

// Accepts an object without an `id`, returns one with `id`
async function post<T extends object>(entityType: string, newEntity: T): Promise<T & EntityId> {
    const entity: T & EntityId = {...newEntity, id: _makeId()}
    const entities = await query<T & EntityId>(entityType)
    entities.push(entity)
    _save(entityType, entities)
    return entity
}

async function put<T extends EntityId>(entityType: string, updatedEntity: T): Promise<T> {
    const entities = await query<T>(entityType)
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove<T extends EntityId>(entityType: string, entityId: string): Promise<void> {
    const entities = await query<T>(entityType)
    // throw new Error('Oops!')
    const idx = entities.findIndex(entity => entity.id === entityId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1)
    _save(entityType, entities)
}

// Private functions

function _save(entityType: string, entities: any[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5): string {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}