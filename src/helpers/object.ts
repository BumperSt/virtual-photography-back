export const assignValues = (object:any) => {
    let new_object:any = {}
    Object.keys(object).forEach((key) => {
        if(object[key] !== undefined){
            new_object[key] = object[key]
        }
    })
    return new_object
}

export const assignFindQuery = (object:any,isiD:string[]=[]) => {
    let new_object:any = {}
    Object.keys(object).forEach((key) => {
        let object_value = object[key]
        if(isiD.includes(key)){
            new_object[key] = object_value
        }else{
            new_object[key] = {
                $regex: object_value,
                $options: 'i'
            }
        }
    })
    return new_object
}


export const filterObject = (object:any,filter_fields:string[]) => {
    let object_filtered : any = {}

    filter_fields.forEach((field) => {
        if(object[field]){
            object_filtered[field] = object[field]
        }
    })

    return object_filtered
}


// filter fields from json object    