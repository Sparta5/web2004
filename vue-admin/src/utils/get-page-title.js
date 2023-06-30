import config from '@/config';
import { name } from './../../package.json';
const title = config.title || name;

export default function getPageTitle(pageTitle) {
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return `${title}`;
}
