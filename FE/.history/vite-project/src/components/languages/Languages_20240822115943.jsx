import React from "react";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "VietNam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { t, i18n } = useTranslation();

    return (
        <div>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button
                        key={lng}
                        style={{
                            fontWeight:
                                i18n.resolvedLanguage === lng
                                    ? "bold"
                                    : "normal",
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
        </div>
    );
};

export default Languages;
