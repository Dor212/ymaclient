import { Helmet } from "react-helmet";

const Section = ({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) => (
    <section id={id} className="max-w-4xl px-4 py-8 mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-[#063942]">{title}</h2>
        <div className="space-y-4 leading-relaxed text-slate-800">{children}</div>
        <hr className="my-8 border-slate-300/70" />
    </section>
);

export default function LegalPage() {
    return (
        <main className="hebrew-content pt-24 pb-16 bg-[#F8FAFC] min-h-screen">
            <Helmet>
                <title>הצהרת נגישות, פרטיות, תנאי שימוש וקוקיז</title>
                <html lang="he" dir="rtl" />
            </Helmet>

            <header className="max-w-4xl px-4 mx-auto">
                <h1 className="text-3xl font-extrabold text-[#063942]">
                    הצהרת נגישות, מדיניות פרטיות, תנאי שימוש וקוקיז
                </h1>
                <p className="mt-2 text-slate-600">
                    עודכן לאחרונה: {new Date().toLocaleDateString("he-IL")}
                </p>

                <nav className="flex flex-wrap gap-3 mt-4 text-sm">
                    <a href="#accessibility" className="px-3 py-1 rounded-full bg-[#063942] text-white hover:opacity-90">נגישות</a>
                    <a href="#privacy" className="px-3 py-1 rounded-full bg-[#063942] text-white hover:opacity-90">פרטיות</a>
                    <a href="#terms" className="px-3 py-1 rounded-full bg-[#063942] text-white hover:opacity-90">תנאי שימוש</a>
                    <a href="#cookies" className="px-3 py-1 rounded-full bg-[#063942] text-white hover:opacity-90">קוקיז</a>
                </nav>
            </header>

            <Section id="accessibility" title="הצהרת נגישות">
                <p>
                    אנו פועלים להנגיש את האתר לכלל המשתמשים, לרבות אנשים עם מוגבלות, בהתאם להנחיות
                    WCAG 2.2 רמה AA. אם נתקלתם בליקוי נגישות, אנא פנו אלינו ונפעל לתיקון בהקדם.
                </p>
                <ul className="pr-6 list-disc">
                    <li>ניווט מקלדת, ניגודיות מספקת וטקסט חלופי לתמונות משמעותיות.</li>
                    <li>תצוגה רספונסיבית, היררכיית כותרות ושפה סמנטית תקינה.</li>
                </ul>
                <p>
                    קשר לנגישות:{" "}
                    <a className="underline" href="custwebyma@gmail.com">custwebyma@gmail.com</a>
                </p>
            </Section>

            <Section id="privacy" title="מדיניות פרטיות">
                <p>
                    אנו מכבדים את פרטיותכם. אנו עשויים לאסוף פרטים שמסרתם מרצון (כגון טופס קשר)
                    ונתוני שימוש אנונימיים (כגון קוקיז וסטטיסטיקות). השימוש במידע נעשה לשיפור
                    השירות, מענה לפניות ואבטחה. לא נעביר פרטים לצד ג׳ אלא אם נדרש לפי דין או לצורך
                    הפעלה תקינה של השירות.
                </p>
                <p>לבקשות גישה/עדכון/מחיקה של מידע אישי – פנו אלינו בדוא״ל לעיל.</p>
            </Section>

            <Section id="terms" title="תנאי שימוש">
                <ul className="pr-6 list-disc">
                    <li>השימוש באתר באחריות המשתמש. התכנים עשויים להשתנות ללא הודעה מוקדמת.</li>
                    <li>חל איסור שימוש לרעה, פגיעה, הטעיה או הפרת כל דין באמצעות האתר.</li>
                    <li>זכויות הקניין הרוחני בתכנים שייכות לבעל האתר, אלא אם צוין אחרת.</li>
                </ul>
            </Section>

            <Section id="cookies" title="מדיניות קוקיז">
                <p>
                    אנו משתמשים בעוגיות (Cookies) לצורך תפעול האתר, ניתוח שימוש ושיפור חוויית
                    הגלישה. ניתן להתאים העדפות בבאנר הקוקיז שמופיע בביקור הראשון, או דרך הגדרות
                    הדפדפן.
                </p>
            </Section>
        </main>
    );
}
