import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageComponent() {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };
    return (
        <div>
            <select onChange={handleChangeLanguage}>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="am">አማርኛ</option>
            </select>
        </div>
    );
}
