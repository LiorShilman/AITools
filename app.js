// ===== AI Tools Manager App =====

const STORAGE_KEY = 'ai_tools_data';

// ===== Default Data (embedded from ai_tools_catalog_he.json) =====
const DEFAULT_DATA = {
    categories: [
        { id: "assistants", name_he: "עוזרי שיחה ו-LLM", description_he: "כלים לשיחה, כתיבה, ניתוח, קוד וחיפוש ידע." },
        { id: "writing", name_he: "כתיבה, עריכה ותוכן", description_he: "כתיבה שיווקית/מקצועית, ניסוח, עריכה ודקדוק." },
        { id: "research", name_he: "מחקר, חיפוש וידע עם מקורות", description_he: "חיפוש וסיכום עם ציטוטים/מקורות, ניהול ידע מחקרי." },
        { id: "coding", name_he: "פיתוח תוכנה (Code AI)", description_he: "עוזרי קוד, IDE חכמים, בדיקות ותיעוד." },
        { id: "automation", name_he: "אוטומציה ו-Workflow", description_he: "חיבור מערכות וזרימות עבודה, סוכנים ואוטומציות." },
        { id: "productivity", name_he: "פרודוקטיביות, ניהול משימות ומסמכים", description_he: "סיכומי פגישות, תמלול, מצגות, מסמכים ותכנון." },
        { id: "image_gen", name_he: "יצירת תמונות וגרפיקה", description_he: "טקסט-לתמונה, עריכת תמונות ויצירה גרפית." },
        { id: "video_gen", name_he: "וידאו, אנימציה ו-Avatars", description_he: "טקסט-לוידאו, עריכה חכמה, אווטרים ודיבוב." },
        { id: "audio_voice", name_he: "אודיו, קול ומוזיקה", description_he: "TTS, קלונינג קול, יצירת מוזיקה, שיפור אודיו." },
        { id: "design", name_he: "עיצוב מוצר ו-UX/UI", description_he: "עיצוב מסכים, פרוטוטייפ, עוזרי עיצוב ו-assets." },
        { id: "data_bi", name_he: "דאטה, BI ואנליטיקה", description_he: "ניתוח נתונים, דאטה-סיינס, BI, מודלים ואנליטיקה." },
        { id: "marketing", name_he: "שיווק, Growth וקריאייטיב", description_he: "קריאייטיב מודעות, SEO, קמפיינים ותוכן לשיווק." },
        { id: "sales_cs", name_he: "מכירות, CRM ושירות לקוחות", description_he: "Sales enablement, CRM, צ'אטבוטים ותמיכת לקוחות." },
        { id: "hr", name_he: "HR וגיוס", description_he: "מיון מועמדים, ראיונות, כתיבת מודעות ותהליכי HR." },
        { id: "legal", name_he: "משפטי ו-Compliance", description_he: "סקירת חוזים, ניסוח, ציות וניתוח מסמכים משפטיים." },
        { id: "security", name_he: "אבטחת מידע וסייבר", description_he: "זיהוי איומים, SOC, ניתוח אירועים ו-attack surface." },
        { id: "finance", name_he: "פיננסים וניתוח שווקים", description_he: "מחקר פיננסי, ניתוח דוחות, דאטה שווקים ועוזרים." },
        { id: "education", name_he: "למידה וחינוך", description_he: "מורים/חונכים, יצירת תרגול, כרטיסיות וסיכומים." }
    ],
    tools: [
        { name: "ChatGPT (OpenAI)", url: "https://chat.openai.com/", category_id: "assistants", subcategory_he: "עוזר כללי רב-תחומי", description_he: "צ'אט AI לכתיבה, ניתוח, קוד ומשימות כלליות (כולל מודלים מולטימודליים לפי תכנית המשתמש).", tags: ["chat", "writing", "coding", "multimodal"] },
        { name: "Claude (Anthropic)", url: "https://claude.ai/", category_id: "assistants", subcategory_he: "עוזר שיחה וכתיבה", description_he: "עוזר שיחה המבוסס על מודלי Claude לשימושים של כתיבה, ניתוח ותמיכה במשימות ידע.", tags: ["chat", "analysis", "writing"] },
        { name: "Google Gemini", url: "https://gemini.google.com/", category_id: "assistants", subcategory_he: "עוזר שיחה של Google", description_he: "עוזר שיחה של Google לשאלות, כתיבה וסיוע במשימות, עם אינטגרציות לשירותי Google.", tags: ["chat", "google", "productivity"] },
        { name: "Microsoft Copilot", url: "https://copilot.microsoft.com/", category_id: "assistants", subcategory_he: "עוזר שיחה של Microsoft", description_he: "עוזר שיחה של Microsoft למשימות ידע ויצירת תוכן, כולל שילובים עם מוצרי Microsoft.", tags: ["chat", "microsoft", "productivity"] },
        { name: "Perplexity", url: "https://www.perplexity.ai/", category_id: "assistants", subcategory_he: "מנוע תשובות עם מקורות", description_he: "מנוע חיפוש-תשובות שמציג סיכומים ומקורות, מתאים למחקר מהיר.", tags: ["search", "citations", "research"] },
        { name: "Grok", url: "https://grok.com/", category_id: "assistants", subcategory_he: "עוזר שיחה", description_he: "עוזר שיחה מבית xAI בתוך/לצד האקוסיסטם של X (טוויטר).", tags: ["chat"] },
        { name: "Meta AI", url: "https://www.meta.ai/", category_id: "assistants", subcategory_he: "עוזר שיחה", description_he: "עוזר שיחה מבית Meta לשימושים כלליים דרך מוצרי Meta.", tags: ["chat"] },
        { name: "Mistral (Le Chat)", url: "https://chat.mistral.ai/", category_id: "assistants", subcategory_he: "עוזר שיחה", description_he: "ממשק שיחה למודלי Mistral לשימושים כלליים.", tags: ["chat", "llm"] },
        { name: "Grammarly", url: "https://www.grammarly.com/", category_id: "writing", subcategory_he: "דקדוק וניסוח", description_he: "בדיקת דקדוק, ניסוח ושיפור טקסט באנגלית (ובחלק מהפיצ'רים גם כתיבה מסייעת).", tags: ["writing", "grammar"] },
        { name: "Wordtune", url: "https://www.wordtune.com/", category_id: "writing", subcategory_he: "שכתוב וניסוח", description_he: "כלי לשכתוב משפטים ושיפור סגנון כתיבה.", tags: ["rewriting", "writing"] },
        { name: "ProWritingAid", url: "https://prowritingaid.com/", category_id: "writing", subcategory_he: "עריכה לסופרים", description_he: "כלי עריכה וניתוח סגנון לכתיבה ארוכה (סיפורת/ספרות/תוכן).", tags: ["writing", "editing"] },
        { name: "Jasper", url: "https://www.jasper.ai/", category_id: "writing", subcategory_he: "קופי שיווקי", description_he: "פלטפורמה ליצירת תוכן שיווקי וקופי לקמפיינים.", tags: ["marketing", "copywriting"] },
        { name: "Copy.ai", url: "https://www.copy.ai/", category_id: "writing", subcategory_he: "קופי שיווקי", description_he: "כלי לכתיבת טקסטים שיווקיים ותהליכי תוכן לצוותים.", tags: ["marketing", "copywriting"] },
        { name: "Writesonic", url: "https://writesonic.com/", category_id: "writing", subcategory_he: "תוכן ו-SEO", description_he: "כלי ליצירת תוכן, בלוגים ודפי נחיתה, כולל פיצ'רי SEO.", tags: ["seo", "writing"] },
        { name: "Anyword", url: "https://anyword.com/", category_id: "writing", subcategory_he: "קופי ממוקד ביצועים", description_he: "פלטפורמה לכתיבת קופי עם דגש על התאמה לקהלים וביצועים.", tags: ["marketing", "copywriting"] },
        { name: "Writer", url: "https://writer.com/", category_id: "writing", subcategory_he: "כתיבה ארגונית", description_he: "פלטפורמת כתיבה ארגונית עם כללי מותג וזרימות עבודה לצוותים.", tags: ["enterprise", "writing"] },
        { name: "Sudowrite", url: "https://www.sudowrite.com/", category_id: "writing", subcategory_he: "כתיבה יצירתית", description_he: "כלי סיוע לכתיבה יצירתית (עלילה, סגנון, שכתוב).", tags: ["creative", "writing"] },
        { name: "Elicit", url: "https://elicit.com/", category_id: "research", subcategory_he: "סקירת ספרות", description_he: "כלי לסיוע במחקר אקדמי: חיפוש מאמרים, סיכומים וחילוץ טענות.", tags: ["papers", "research", "citations"] },
        { name: "Consensus", url: "https://consensus.app/", category_id: "research", subcategory_he: "חיפוש מבוסס מאמרים", description_he: "מנוע חיפוש שמכוון לתשובות על בסיס מאמרים מדעיים.", tags: ["papers", "research"] },
        { name: "scite", url: "https://scite.ai/", category_id: "research", subcategory_he: "הערכת ציטוטים", description_he: "כלי שמסייע להבין כיצד מאמרים מצוטטים (תומך/סותר/מזכיר).", tags: ["papers", "citations"] },
        { name: "Zotero", url: "https://www.zotero.org/", category_id: "research", subcategory_he: "ניהול מקורות", description_he: "מנהל מקורות/ביבליוגרפיה (עם הרחבות ואקוסיסטם תוספים).", tags: ["references", "library"] },
        { name: "Connected Papers", url: "https://www.connectedpapers.com/", category_id: "research", subcategory_he: "מפת מאמרים", description_he: "ויזואליזציה של קשרים בין מאמרים כדי להרחיב סקירת ספרות.", tags: ["papers", "graph"] },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot", category_id: "coding", subcategory_he: "עוזר קוד", description_he: "השלמת קוד והצעות בתוך IDE על בסיס קונטקסט.", tags: ["coding", "ide"] },
        { name: "Cursor", url: "https://www.cursor.com/", category_id: "coding", subcategory_he: "IDE עם AI", description_he: "עורך קוד/IDE עם יכולות AI מובנות לשיחה על קוד, refactor והשלמות.", tags: ["coding", "ide"] },
        { name: "Codeium", url: "https://codeium.com/", category_id: "coding", subcategory_he: "השלמות קוד", description_he: "השלמות קוד ושיחה על קוד במספר IDEים.", tags: ["coding", "ide"] },
        { name: "Amazon CodeWhisperer", url: "https://aws.amazon.com/codewhisperer/", category_id: "coding", subcategory_he: "השלמות קוד", description_he: "עוזר קוד מבית AWS להשלמות והצעות.", tags: ["coding", "aws"] },
        { name: "Replit", url: "https://replit.com/", category_id: "coding", subcategory_he: "פיתוח בענן", description_he: "סביבת פיתוח בענן עם יכולות AI ותבניות לפרויקטים.", tags: ["coding", "cloud"] },
        { name: "Sourcegraph Cody", url: "https://sourcegraph.com/cody", category_id: "coding", subcategory_he: "חיפוש ושיחה על קוד בסיסים גדולים", description_he: "עוזר AI לניווט, חיפוש ושיחה על מאגרי קוד גדולים.", tags: ["coding", "search"] },
        { name: "Tabnine", url: "https://www.tabnine.com/", category_id: "coding", subcategory_he: "השלמות קוד", description_he: "עוזר השלמות קוד עם תמיכה ב-IDE שונים.", tags: ["coding", "ide"] },
        { name: "Snyk", url: "https://snyk.io/", category_id: "coding", subcategory_he: "אבטחת קוד", description_he: "סריקת תלות/קוד לאיתור חולשות ופתרונות.", tags: ["security", "dev"] },
        { name: "Zapier", url: "https://zapier.com/", category_id: "automation", subcategory_he: "אוטומציה", description_he: "חיבור אפליקציות ויצירת אוטומציות בין שירותים.", tags: ["automation", "integrations"] },
        { name: "Make", url: "https://www.make.com/", category_id: "automation", subcategory_he: "אוטומציה", description_he: "פלטפורמת no/low-code לזרימות עבודה מורכבות.", tags: ["automation", "integrations"] },
        { name: "n8n", url: "https://n8n.io/", category_id: "automation", subcategory_he: "אוטומציה למפתחים", description_he: "פלטפורמת אוטומציה עם יכולת self-host והרחבות.", tags: ["automation", "developer"] },
        { name: "IFTTT", url: "https://ifttt.com/", category_id: "automation", subcategory_he: "אוטומציות פשוטות", description_he: "אוטומציות קלות בין שירותים ואינטרנט של הדברים.", tags: ["automation", "iot"] },
        { name: "Airtable", url: "https://www.airtable.com/", category_id: "automation", subcategory_he: "בסיס נתונים ו-workflows", description_he: "פלטפורמה בסגנון גיליון-דאטהבייס עם אוטומציות ואפליקציות.", tags: ["database", "workflow"] },
        { name: "Retool", url: "https://retool.com/", category_id: "automation", subcategory_he: "בניית כלים פנימיים", description_he: "בניית dashboards וכלים פנימיים עם אינטגרציות לדאטה.", tags: ["internal-tools", "workflow"] },
        { name: "Notion", url: "https://www.notion.so/", category_id: "productivity", subcategory_he: "ניהול ידע", description_he: "סביבת עבודה למסמכים, דאטה ומשימות עם יכולות AI.", tags: ["docs", "tasks", "wiki"] },
        { name: "Fireflies.ai", url: "https://fireflies.ai/", category_id: "productivity", subcategory_he: "תמלול פגישות", description_he: "הקלטה/תמלול/סיכום פגישות עם חיפוש ושיתופים.", tags: ["meetings", "transcription"] },
        { name: "Otter.ai", url: "https://otter.ai/", category_id: "productivity", subcategory_he: "תמלול פגישות", description_he: "תמלול וסיכום פגישות ושיחות.", tags: ["meetings", "transcription"] },
        { name: "Read.ai", url: "https://www.read.ai/", category_id: "productivity", subcategory_he: "תובנות פגישות", description_he: "סיכומי פגישות, תובנות ופעולות המשך.", tags: ["meetings", "productivity"] },
        { name: "Gamma", url: "https://gamma.app/", category_id: "productivity", subcategory_he: "מצגות", description_he: "יצירת מצגות/מסמכים חזותיים על בסיס טקסט.", tags: ["presentations", "docs"] },
        { name: "Tome", url: "https://tome.app/", category_id: "productivity", subcategory_he: "סטוריטלינג ומצגות", description_he: "יצירת מצגות וסיפורים ויזואליים עם AI.", tags: ["presentations"] },
        { name: "Beautiful.ai", url: "https://www.beautiful.ai/", category_id: "productivity", subcategory_he: "מצגות", description_he: "בניית מצגות עם תבניות ועיצוב אוטומטי.", tags: ["presentations", "design"] },
        { name: "Midjourney", url: "https://www.midjourney.com/", category_id: "image_gen", subcategory_he: "טקסט-לתמונה", description_he: "מחולל תמונות מבוסס פרומפטים עם סגנון עשיר.", tags: ["text-to-image", "art"] },
        { name: "DALL·E (via ChatGPT)", url: "https://openai.com/dall-e", category_id: "image_gen", subcategory_he: "טקסט-לתמונה", description_he: "מודל יצירת תמונות מבית OpenAI (נגיש גם דרך מוצרי OpenAI).", tags: ["text-to-image"] },
        { name: "Adobe Firefly", url: "https://www.adobe.com/products/firefly.html", category_id: "image_gen", subcategory_he: "יצירה ועריכה", description_he: "כלי יצירה גרפית של Adobe עם יכולות generative.", tags: ["design", "commercial"] },
        { name: "Leonardo AI", url: "https://leonardo.ai/", category_id: "image_gen", subcategory_he: "יצירת assets", description_he: "מחולל תמונות ו-assets, נפוץ לעיצוב משחקים וקריאייטיב.", tags: ["assets", "design"] },
        { name: "Ideogram", url: "https://ideogram.ai/", category_id: "image_gen", subcategory_he: "טקסט-לתמונה", description_he: "מחולל תמונות עם דגש על טקסט בתוך תמונות ועיצוב.", tags: ["text-to-image", "typography"] },
        { name: "Canva AI", url: "https://www.canva.com/", category_id: "image_gen", subcategory_he: "עיצוב עם AI", description_he: "כלי עיצוב עם יכולות AI ליצירת גרפיקה ותוכן.", tags: ["design", "templates"] },
        { name: "Remove.bg", url: "https://www.remove.bg/", category_id: "image_gen", subcategory_he: "הסרת רקע", description_he: "הסרת רקע אוטומטית לתמונות.", tags: ["photo-editing"] },
        { name: "Runway", url: "https://runwayml.com/", category_id: "video_gen", subcategory_he: "וידאו גנרטיבי", description_he: "כלי ליצירת ועריכת וידאו בעזרת AI.", tags: ["video", "gen"] },
        { name: "Synthesia", url: "https://www.synthesia.io/", category_id: "video_gen", subcategory_he: "אווטרים עסקיים", description_he: "יצירת סרטונים עם אווטרים מדברים על בסיס טקסט.", tags: ["avatars", "video"] },
        { name: "HeyGen", url: "https://www.heygen.com/", category_id: "video_gen", subcategory_he: "אווטרים ודיבוב", description_he: "יצירת סרטונים עם אווטרים, דיבוב ותרגום וידאו.", tags: ["avatars", "dubbing"] },
        { name: "Pika", url: "https://pika.art/", category_id: "video_gen", subcategory_he: "טקסט-לוידאו", description_he: "יצירת וידאו קצר על בסיס פרומפטים.", tags: ["text-to-video"] },
        { name: "Descript", url: "https://www.descript.com/", category_id: "video_gen", subcategory_he: "עריכת וידאו/אודיו דרך טקסט", description_he: "עריכת תוכן לפי תמלול, עם תכונות דיבוב/שיפור שמע.", tags: ["editing", "transcription"] },
        { name: "CapCut", url: "https://www.capcut.com/", category_id: "video_gen", subcategory_he: "עריכה", description_he: "עורך וידאו עם פיצ'רי AI (כתוביות, אפקטים ועוד).", tags: ["editing"] },
        { name: "ElevenLabs", url: "https://elevenlabs.io/", category_id: "audio_voice", subcategory_he: "טקסט-לדיבור", description_he: "יצירת קריינות וקולות ב-AI (כולל דיבוב ושפות).", tags: ["tts", "voice"] },
        { name: "Play.ht", url: "https://play.ht/", category_id: "audio_voice", subcategory_he: "טקסט-לדיבור", description_he: "יצירת קריינות וקולות על בסיס טקסט.", tags: ["tts", "voice"] },
        { name: "Suno", url: "https://suno.com/", category_id: "audio_voice", subcategory_he: "יצירת מוזיקה", description_he: "יצירת שירים/מוזיקה על בסיס טקסט.", tags: ["music", "generation"] },
        { name: "Udio", url: "https://www.udio.com/", category_id: "audio_voice", subcategory_he: "יצירת מוזיקה", description_he: "יצירת מוזיקה ושירים באמצעות פרומפטים.", tags: ["music", "generation"] },
        { name: "Adobe Podcast", url: "https://podcast.adobe.com/", category_id: "audio_voice", subcategory_he: "שיפור דיבור", description_he: "כלי לשיפור איכות קול והקלטות דיבור.", tags: ["audio", "enhancement"] },
        { name: "Krisp", url: "https://krisp.ai/", category_id: "audio_voice", subcategory_he: "סינון רעשים", description_he: "סינון רעשי רקע לשיחות והקלטות.", tags: ["noise-cancel"] },
        { name: "Figma", url: "https://www.figma.com/", category_id: "design", subcategory_he: "עיצוב UI", description_he: "פלטפורמת עיצוב ושיתוף לקבצי UI/UX, עם יכולות AI במוצר.", tags: ["ui", "collaboration"] },
        { name: "Framer", url: "https://www.framer.com/", category_id: "design", subcategory_he: "אתרים ועיצוב", description_he: "בניית אתרים אינטראקטיביים עם רכיבים ותבניות, כולל יכולות AI.", tags: ["web", "design"] },
        { name: "Wix", url: "https://www.wix.com/", category_id: "design", subcategory_he: "בניית אתרים", description_he: "בניית אתרים עם רכיבי AI לתוכן ולעיצוב.", tags: ["web", "builder"] },
        { name: "Webflow", url: "https://webflow.com/", category_id: "design", subcategory_he: "בניית אתרים", description_he: "פלטפורמת בניית אתרים עם שליטה עיצובית מתקדמת.", tags: ["web", "builder"] },
        { name: "Miro", url: "https://miro.com/", category_id: "design", subcategory_he: "לוחות שיתופיים", description_he: "לוח שיתופי לסיעור מוחות ותכנון, עם פיצ'רי AI.", tags: ["whiteboard", "collaboration"] },
        { name: "Tableau", url: "https://www.tableau.com/", category_id: "data_bi", subcategory_he: "BI", description_he: "פלטפורמת BI לויזואליזציה וניתוח נתונים.", tags: ["bi", "analytics"] },
        { name: "Microsoft Power BI", url: "https://powerbi.microsoft.com/", category_id: "data_bi", subcategory_he: "BI", description_he: "BI מבית Microsoft לויזואליזציה ודשבורדים.", tags: ["bi", "microsoft"] },
        { name: "Looker", url: "https://cloud.google.com/looker", category_id: "data_bi", subcategory_he: "BI", description_he: "פלטפורמת BI של Google Cloud.", tags: ["bi", "google"] },
        { name: "DataRobot", url: "https://www.datarobot.com/", category_id: "data_bi", subcategory_he: "AutoML", description_he: "פלטפורמת ML/AutoML לבניית מודלים ופריסה.", tags: ["ml", "automl"] },
        { name: "Hugging Face", url: "https://huggingface.co/", category_id: "data_bi", subcategory_he: "מודלים וקוד", description_he: "Hub למודלים, דאטהסטים וכלי NLP/GenAI למפתחים.", tags: ["models", "datasets"] },
        { name: "Semrush", url: "https://www.semrush.com/", category_id: "marketing", subcategory_he: "SEO", description_he: "כלי SEO ושיווק דיגיטלי עם יכולות AI בתהליכי תוכן ומחקר.", tags: ["seo", "marketing"] },
        { name: "Ahrefs", url: "https://ahrefs.com/", category_id: "marketing", subcategory_he: "SEO", description_he: "כלי SEO למחקר מילות מפתח וקישורים.", tags: ["seo"] },
        { name: "Surfer SEO", url: "https://surferseo.com/", category_id: "marketing", subcategory_he: "SEO תוכן", description_he: "אופטימיזציה לכתיבה ותוכן בהתאם ל-SEO.", tags: ["seo", "content"] },
        { name: "HubSpot", url: "https://www.hubspot.com/", category_id: "marketing", subcategory_he: "שיווק/CRM", description_he: "פלטפורמת שיווק ו-CRM עם יכולות AI במוצר.", tags: ["crm", "marketing"] },
        { name: "AdCreative.ai", url: "https://www.adcreative.ai/", category_id: "marketing", subcategory_he: "קריאייטיב מודעות", description_he: "יצירת קריאייטיבים למודעות בעזרת AI.", tags: ["ads", "creative"] },
        { name: "Canva", url: "https://www.canva.com/", category_id: "marketing", subcategory_he: "עיצוב שיווקי", description_he: "עיצוב לתכנים שיווקיים עם תבניות ויכולות AI.", tags: ["design", "marketing"] },
        { name: "Salesforce Einstein", url: "https://www.salesforce.com/products/einstein/", category_id: "sales_cs", subcategory_he: "AI ל-CRM", description_he: "יכולות AI בתוך Salesforce לניתוח, תחזיות ואוטומציה.", tags: ["crm", "sales"] },
        { name: "Intercom", url: "https://www.intercom.com/", category_id: "sales_cs", subcategory_he: "שירות לקוחות", description_he: "פלטפורמת שירות לקוחות וצ'אט עם יכולות AI.", tags: ["support", "chat"] },
        { name: "Zendesk", url: "https://www.zendesk.com/", category_id: "sales_cs", subcategory_he: "שירות לקוחות", description_he: "מערכת טיקטים ושירות לקוחות עם יכולות אוטומציה/AI.", tags: ["support"] },
        { name: "Gong", url: "https://www.gong.io/", category_id: "sales_cs", subcategory_he: "Revenue intelligence", description_he: "ניתוח שיחות מכירה ותובנות לצוותי Revenue.", tags: ["sales", "calls"] },
        { name: "Drift", url: "https://www.drift.com/", category_id: "sales_cs", subcategory_he: "שיווק שיחה", description_he: "צ'אט ו-automation ליצירת לידים.", tags: ["chat", "leadgen"] },
        { name: "LinkedIn Talent Solutions", url: "https://business.linkedin.com/talent-solutions", category_id: "hr", subcategory_he: "גיוס", description_he: "כלים לגיוס וניהול תהליכי מועמדים בתוך LinkedIn.", tags: ["recruiting"] },
        { name: "Greenhouse", url: "https://www.greenhouse.com/", category_id: "hr", subcategory_he: "ATS", description_he: "מערכת ניהול גיוס (ATS) עם אינטגרציות.", tags: ["ats", "recruiting"] },
        { name: "Lever", url: "https://www.lever.co/", category_id: "hr", subcategory_he: "ATS", description_he: "ATS לניהול תהליכי גיוס.", tags: ["ats", "recruiting"] },
        { name: "Textio", url: "https://textio.com/", category_id: "hr", subcategory_he: "כתיבת מודעות", description_he: "שיפור ניסוח מודעות דרושים ושפת תקשורת ארגונית.", tags: ["writing", "hr"] },
        { name: "Harvey", url: "https://www.harvey.ai/", category_id: "legal", subcategory_he: "עוזר משפטי", description_he: "פלטפורמה לעבודה משפטית עם AI (מחקר/טיוטות/מסמכים).", tags: ["legal", "documents"] },
        { name: "Ironclad", url: "https://ironcladapp.com/", category_id: "legal", subcategory_he: "ניהול חוזים", description_he: "CLM לניהול חוזים, זרימות אישור וניתוח.", tags: ["contracts", "clm"] },
        { name: "Luminance", url: "https://www.luminance.com/", category_id: "legal", subcategory_he: "ניתוח חוזים", description_he: "כלי לניתוח חוזים ובדיקות due diligence.", tags: ["contracts", "analysis"] },
        { name: "DocuSign", url: "https://www.docusign.com/", category_id: "legal", subcategory_he: "חתימות דיגיטליות", description_he: "חתימות דיגיטליות וניהול מסמכים.", tags: ["esign", "workflow"] },
        { name: "CrowdStrike", url: "https://www.crowdstrike.com/", category_id: "security", subcategory_he: "EDR/XDR", description_he: "פלטפורמת אבטחה לנקודות קצה ולזיהוי איומים.", tags: ["edr", "xdr"] },
        { name: "Palo Alto Networks", url: "https://www.paloaltonetworks.com/", category_id: "security", subcategory_he: "אבטחת רשת", description_he: "מוצרי אבטחת רשת וענן (משפחה רחבה).", tags: ["network-security"] },
        { name: "Wiz", url: "https://www.wiz.io/", category_id: "security", subcategory_he: "אבטחת ענן", description_he: "אבטחת ענן (CSPM/CNAPP) לנראות וסיכונים.", tags: ["cloud-security"] },
        { name: "Snyk", url: "https://snyk.io/", category_id: "security", subcategory_he: "AppSec", description_he: "אבטחת קוד ותלויות (כלי AppSec).", tags: ["appsec"] },
        { name: "Darktrace", url: "https://darktrace.com/", category_id: "security", subcategory_he: "זיהוי אנומליות", description_he: "זיהוי אנומליות ואיומים ברשת/אימייל.", tags: ["threat-detection"] },
        { name: "AlphaSense", url: "https://www.alpha-sense.com/", category_id: "finance", subcategory_he: "מחקר פיננסי", description_he: "פלטפורמת מחקר לשווקים וחברות עם חיפוש מסמכים ותובנות.", tags: ["finance", "research"] },
        { name: "FactSet", url: "https://www.factset.com/", category_id: "finance", subcategory_he: "דאטה פיננסי", description_he: "דאטה וכלי אנליטיקה לשווקים ומוסדות.", tags: ["market-data"] },
        { name: "Bloomberg", url: "https://www.bloomberg.com/professional", category_id: "finance", subcategory_he: "דאטה וטרמינל", description_he: "מוצרי Bloomberg Professional לשוק ההון.", tags: ["market-data"] },
        { name: "TradingView", url: "https://www.tradingview.com/", category_id: "finance", subcategory_he: "גרפים וניתוח", description_he: "פלטפורמת גרפים וניתוח טכני/קהילה.", tags: ["charts", "analysis"] },
        { name: "Khan Academy (Khanmigo)", url: "https://www.khanacademy.org/khan-labs", category_id: "education", subcategory_he: "חונך למידה", description_he: "כלי/פיצ'רים ניסיוניים של Khan ללמידה מודרכת.", tags: ["tutor", "education"] },
        { name: "Duolingo", url: "https://www.duolingo.com/", category_id: "education", subcategory_he: "לימוד שפות", description_he: "לימוד שפות עם התאמה ותרגול.", tags: ["languages"] },
        { name: "Quizlet", url: "https://quizlet.com/", category_id: "education", subcategory_he: "כרטיסיות ותרגול", description_he: "כרטיסיות, תרגול ובנק שאלות (כולל יכולות AI במוצר).", tags: ["flashcards", "study"] },
        { name: "Coursera", url: "https://www.coursera.org/", category_id: "education", subcategory_he: "קורסים", description_he: "פלטפורמת קורסים עם כלי למידה ותוכן רחב.", tags: ["courses"] }
    ]
};

let state = {
    categories: [],
    tools: [],
    activeCategory: 'all',
    searchQuery: '',
    editingIndex: null
};

// ===== DOM Elements =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    toolsGrid: $('#toolsGrid'),
    noResults: $('#noResults'),
    searchInput: $('#searchInput'),
    clearSearch: $('#clearSearch'),
    categoryFilter: $('#categoryFilter'),
    categoryChips: $('#categoryChips'),
    totalTools: $('#totalTools'),
    totalCategories: $('#totalCategories'),
    addToolBtn: $('#addToolBtn'),
    // Add/Edit Modal
    modalOverlay: $('#modalOverlay'),
    modalTitle: $('#modalTitle'),
    modalClose: $('#modalClose'),
    toolForm: $('#toolForm'),
    toolName: $('#toolName'),
    toolUrl: $('#toolUrl'),
    toolCategory: $('#toolCategory'),
    toolSubcategory: $('#toolSubcategory'),
    toolDescription: $('#toolDescription'),
    toolTags: $('#toolTags'),
    saveToolBtn: $('#saveToolBtn'),
    cancelBtn: $('#cancelBtn'),
    // Delete Modal
    deleteModalOverlay: $('#deleteModalOverlay'),
    deleteModalClose: $('#deleteModalClose'),
    deleteToolName: $('#deleteToolName'),
    confirmDeleteBtn: $('#confirmDeleteBtn'),
    cancelDeleteBtn: $('#cancelDeleteBtn'),
    // Toast
    toast: $('#toast'),
    toastIcon: $('#toastIcon'),
    toastMessage: $('#toastMessage')
};

// ===== Init =====
function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        state.categories = data.categories;
        state.tools = data.tools;
    } else {
        state.categories = JSON.parse(JSON.stringify(DEFAULT_DATA.categories));
        state.tools = JSON.parse(JSON.stringify(DEFAULT_DATA.tools));
        saveToStorage();
    }

    buildCategoryOptions();
    buildCategoryChips();
    updateStats();
    renderTools();
    bindEvents();
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        categories: state.categories,
        tools: state.tools
    }));
}

// ===== Categories =====
function buildCategoryOptions() {
    dom.categoryFilter.innerHTML = '<option value="all">כל הקטגוריות</option>';
    dom.toolCategory.innerHTML = '<option value="">בחר קטגוריה...</option>';

    state.categories.forEach(cat => {
        dom.categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name_he}</option>`;
        dom.toolCategory.innerHTML += `<option value="${cat.id}">${cat.name_he}</option>`;
    });
}

function buildCategoryChips() {
    const counts = {};
    state.tools.forEach(t => {
        counts[t.category_id] = (counts[t.category_id] || 0) + 1;
    });

    let html = `<button class="chip ${state.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
        הכל <span class="chip-count">${state.tools.length}</span>
    </button>`;

    state.categories.forEach(cat => {
        const count = counts[cat.id] || 0;
        if (count > 0) {
            html += `<button class="chip ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.name_he} <span class="chip-count">${count}</span>
            </button>`;
        }
    });

    dom.categoryChips.innerHTML = html;

    dom.categoryChips.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            state.activeCategory = chip.dataset.cat;
            dom.categoryFilter.value = state.activeCategory;
            updateChipsActive();
            renderTools();
        });
    });
}

function updateChipsActive() {
    dom.categoryChips.querySelectorAll('.chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.cat === state.activeCategory);
    });
}

function getCategoryName(id) {
    const cat = state.categories.find(c => c.id === id);
    return cat ? cat.name_he : id;
}

// ===== Stats =====
function updateStats() {
    dom.totalTools.textContent = state.tools.length;
    const usedCategories = new Set(state.tools.map(t => t.category_id));
    dom.totalCategories.textContent = usedCategories.size;
}

// ===== Render Tools =====
function renderTools() {
    let filtered = [...state.tools];

    if (state.activeCategory !== 'all') {
        filtered = filtered.filter(t => t.category_id === state.activeCategory);
    }

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(q) ||
            (t.description_he && t.description_he.toLowerCase().includes(q)) ||
            (t.subcategory_he && t.subcategory_he.toLowerCase().includes(q)) ||
            (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
        );
    }

    if (filtered.length === 0) {
        dom.toolsGrid.innerHTML = '';
        dom.noResults.style.display = 'block';
        return;
    }

    dom.noResults.style.display = 'none';

    dom.toolsGrid.innerHTML = filtered.map((tool, i) => {
        const realIndex = state.tools.indexOf(tool);
        const tags = (tool.tags || []).slice(0, 4).map(tag =>
            `<span class="tag">${escapeHtml(tag)}</span>`
        ).join('');

        return `
        <div class="tool-card" style="animation-delay: ${i * 0.03}s">
            <div class="card-header">
                <div class="card-title-group">
                    <div class="card-title">
                        <a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer">
                            ${escapeHtml(tool.name)}
                            <span class="material-symbols-outlined external-link">open_in_new</span>
                        </a>
                    </div>
                    <div class="card-subcategory">${escapeHtml(tool.subcategory_he || '')}</div>
                </div>
                <div class="card-actions">
                    <button class="card-action-btn edit" data-index="${realIndex}" title="עריכה">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="card-action-btn delete" data-index="${realIndex}" title="מחיקה">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
            <div class="card-description">${escapeHtml(tool.description_he || '')}</div>
            <div class="card-footer">
                <span class="card-category-badge">${escapeHtml(getCategoryName(tool.category_id))}</span>
                <div class="card-tags">${tags}</div>
            </div>
        </div>`;
    }).join('');

    dom.toolsGrid.querySelectorAll('.card-action-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.index)));
    });

    dom.toolsGrid.querySelectorAll('.card-action-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => openDeleteModal(parseInt(btn.dataset.index)));
    });
}

// ===== Events =====
function bindEvents() {
    let searchTimeout;
    dom.searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.searchQuery = dom.searchInput.value.trim();
            dom.clearSearch.classList.toggle('visible', state.searchQuery.length > 0);
            renderTools();
        }, 200);
    });

    dom.clearSearch.addEventListener('click', () => {
        dom.searchInput.value = '';
        state.searchQuery = '';
        dom.clearSearch.classList.remove('visible');
        dom.searchInput.focus();
        renderTools();
    });

    dom.categoryFilter.addEventListener('change', () => {
        state.activeCategory = dom.categoryFilter.value;
        updateChipsActive();
        renderTools();
    });

    dom.addToolBtn.addEventListener('click', openAddModal);

    dom.modalClose.addEventListener('click', closeModal);
    dom.cancelBtn.addEventListener('click', closeModal);
    dom.modalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.modalOverlay) closeModal();
    });

    dom.deleteModalClose.addEventListener('click', closeDeleteModal);
    dom.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    dom.deleteModalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.deleteModalOverlay) closeDeleteModal();
    });

    dom.toolForm.addEventListener('submit', handleFormSubmit);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeDeleteModal();
        }
    });
}

// ===== Add Modal =====
function openAddModal() {
    state.editingIndex = null;
    dom.modalTitle.textContent = 'הוספת כלי חדש';
    dom.saveToolBtn.innerHTML = '<span class="material-symbols-outlined">add_circle</span> הוסף';
    dom.toolForm.reset();
    dom.modalOverlay.classList.add('active');
    setTimeout(() => dom.toolName.focus(), 300);
}

// ===== Edit Modal =====
function openEditModal(index) {
    const tool = state.tools[index];
    if (!tool) return;

    state.editingIndex = index;
    dom.modalTitle.textContent = 'עריכת כלי';
    dom.saveToolBtn.innerHTML = '<span class="material-symbols-outlined">save</span> שמור שינויים';

    dom.toolName.value = tool.name;
    dom.toolUrl.value = tool.url;
    dom.toolCategory.value = tool.category_id;
    dom.toolSubcategory.value = tool.subcategory_he || '';
    dom.toolDescription.value = tool.description_he || '';
    dom.toolTags.value = (tool.tags || []).join(', ');

    dom.modalOverlay.classList.add('active');
    setTimeout(() => dom.toolName.focus(), 300);
}

function closeModal() {
    dom.modalOverlay.classList.remove('active');
    state.editingIndex = null;
}

// ===== Delete Modal =====
let deleteTarget = null;

function openDeleteModal(index) {
    deleteTarget = index;
    dom.deleteToolName.textContent = state.tools[index].name;
    dom.deleteModalOverlay.classList.add('active');

    dom.confirmDeleteBtn.onclick = () => {
        deleteTool(deleteTarget);
        closeDeleteModal();
    };
}

function closeDeleteModal() {
    dom.deleteModalOverlay.classList.remove('active');
    deleteTarget = null;
}

function deleteTool(index) {
    const name = state.tools[index].name;
    state.tools.splice(index, 1);
    saveToStorage();
    updateStats();
    buildCategoryChips();
    renderTools();
    showToast(`"${name}" נמחק בהצלחה`, 'success');
}

// ===== Form Submit =====
function handleFormSubmit(e) {
    e.preventDefault();

    const tool = {
        name: dom.toolName.value.trim(),
        url: dom.toolUrl.value.trim(),
        category_id: dom.toolCategory.value,
        subcategory_he: dom.toolSubcategory.value.trim(),
        description_he: dom.toolDescription.value.trim(),
        tags: dom.toolTags.value.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (state.editingIndex !== null) {
        state.tools[state.editingIndex] = tool;
        showToast(`"${tool.name}" עודכן בהצלחה`, 'success');
    } else {
        state.tools.unshift(tool);
        showToast(`"${tool.name}" נוסף בהצלחה`, 'success');
    }

    saveToStorage();
    updateStats();
    buildCategoryChips();
    renderTools();
    closeModal();
}

// ===== Toast =====
function showToast(message, type = 'info') {
    const icons = {
        success: 'check_circle',
        error: 'error',
        info: 'info'
    };
    dom.toast.className = `toast ${type}`;
    dom.toastIcon.textContent = icons[type] || icons.info;
    dom.toastMessage.textContent = message;
    dom.toast.classList.add('show');

    setTimeout(() => {
        dom.toast.classList.remove('show');
    }, 3000);
}

// ===== Utility =====
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
