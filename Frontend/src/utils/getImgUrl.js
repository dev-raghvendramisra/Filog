import conf from '../conf/conf'
export default function getImgUrl(fileId) {
    let url = `${conf.CDN_ENDPOINT}${fileId}`
    return {url , fileId}
}