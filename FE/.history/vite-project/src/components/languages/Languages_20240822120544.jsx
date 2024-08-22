import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "Vietnam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { i18n } = useTranslation();
    console.log(i18n.resolvedLanguage);

    return (
        <div className="flex flex-center">
            {Object.keys(lngs).map((lng) => (
                <button
                    className={`p-[10px] text-lg ${i18n.resolvedLanguage === lng ? "font-bold" : ""}
                    hover:text-main transition-base`}
                    key={lng}
                    style={{
                        fontWeight:
                            ,
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
