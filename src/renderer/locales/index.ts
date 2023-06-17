import { addLocale, locale } from 'primereact/api';
import * as ru from './ru.json';
import * as en from './en.json';

addLocale('en', en.en);
addLocale('ru', ru.ru);
locale('ru');
