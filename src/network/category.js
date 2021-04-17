import { request } from './request'

export function getCateGory() {
    return request({
        url: '/category'
    })
}

export function getSubCateGory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

export function getCateGoryDateCommont(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}