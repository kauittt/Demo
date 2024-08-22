import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "VietNam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { i18n } = useTranslation();

    return (
        <div className="flex justify-center">
            {Object.keys(lngs).map((lng) => (
                <button
                    key={lng}
                    style={{
                        fontWeight:
                            i18n.resolvedLanguage === lng ? "bold" : "normal",
                    }}
                    type="submit"
                    onClick={() => {
                        i18n.changeLanguage(lng);
                    }}
                >
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
};

export default Languages;
