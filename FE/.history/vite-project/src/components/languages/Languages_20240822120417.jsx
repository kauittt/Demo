import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "VietNam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { i18n } = useTranslation();
    console.log(i18n.resolvedLanguage);

    return (
        <div className="flex flex-center">
            {Object.keys(lngs).map((lng) => (
                <button
                    className={`p-[10px] text-xl hover:text-main transition-base`}
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
