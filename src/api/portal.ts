import { Data, getData } from './config';
export const getPortalUrl = (data: Data) => getData('ViewPortalUrlService', data, 'portal');