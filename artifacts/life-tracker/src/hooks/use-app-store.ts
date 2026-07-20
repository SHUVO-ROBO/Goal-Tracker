import { useLocalStorage } from "./use-local-storage";

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  grade: string;
  gpa: number;
  semester: string;
  status: "completed" | "running";
};

export const INITIAL_COURSES: Course[] = [
  { id: "1",  code: "MATH101",  title: "Discrete Math",                credits: 3, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "2",  code: "CSE101",   title: "Intro to Computer Systems",    credits: 1, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "3",  code: "ENG101",   title: "English I",                    credits: 3, grade: "B+", gpa: 3.33, semester: "242", status: "completed" },
  { id: "4",  code: "HIST101",  title: "History of Bangladesh",        credits: 2, grade: "A",  gpa: 4.00, semester: "242", status: "completed" },
  { id: "5",  code: "CSE103",   title: "Structured Programming",       credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "6",  code: "CSE104",   title: "SPL Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "7",  code: "CSE105",   title: "Digital Logic",                credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "8",  code: "CSE106",   title: "DLD Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "9",  code: "MATH103",  title: "Fundamental Calculus",         credits: 3, grade: "A",  gpa: 4.00, semester: "243", status: "completed" },
  { id: "10", code: "CSE203",   title: "OOP",                          credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "11", code: "CSE204",   title: "OOP Lab",                      credits: 1, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "12", code: "MATH201",  title: "Calculus & Linear Algebra",    credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "13", code: "STAT201",  title: "Probability & Statistics",     credits: 3, grade: "A",  gpa: 4.00, semester: "251", status: "completed" },
  { id: "14", code: "CSE205",   title: "DSA I",                        credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "15", code: "CSE206",   title: "DSA I Lab",                    credits: 1, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "16", code: "CSE207",   title: "Theory of Computation",        credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "17", code: "MATH203",  title: "Coordinate Geometry",          credits: 3, grade: "A",  gpa: 4.00, semester: "252", status: "completed" },
  { id: "18", code: "CSE209",   title: "DSA II",                       credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "19", code: "CSE210",   title: "DSA II Lab",                   credits: 1, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "20", code: "EEE201",   title: "Electrical Circuits",          credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "21", code: "PHY101",   title: "Physics",                      credits: 3, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "22", code: "PHY102",   title: "Physics Lab",                  credits: 1, grade: "A",  gpa: 4.00, semester: "253", status: "completed" },
  { id: "23", code: "CSE3313",  title: "Computer Architecture",        credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "24", code: "CSE3521",  title: "Database Management Systems",  credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "25", code: "EEE2123",  title: "Electronics",                  credits: 3, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
  { id: "26", code: "EEE2124",  title: "Electronics Lab",              credits: 1, grade: "A",  gpa: 4.00, semester: "262", status: "running" },
];

export const INITIAL_CURRENT_TRIMESTER = "262";

export type SelfReview = {
  id: string; task: string; duration: string; completed: boolean; notes: string;
};
export const INITIAL_REVIEWS: SelfReview[] = [
  { id: "1", task: "DSA Fundamentals Revision",       duration: "1.5 hrs", completed: false, notes: "" },
  { id: "2", task: "Mathematics Core Review",          duration: "1.5 hrs", completed: false, notes: "" },
  { id: "3", task: "Structured Programming Practice",  duration: "1 hr",   completed: false, notes: "" },
];

// ── Notes / Links ──────────────────────────────────────────────────────────────
export type NoteLinkCategory =
  | "Lecture Notes" | "Assignment" | "Reference" | "Lab" | "Project" | "Tutorial" | "Other";

export type NoteLink = {
  id: string; title: string; url: string;
  category: NoteLinkCategory; subject: string; date: string;
};

export const NOTE_CATEGORY_COLORS: Record<NoteLinkCategory, string> = {
  "Lecture Notes": "bg-primary/15 text-primary border-primary/30",
  "Assignment":    "bg-destructive/15 text-destructive border-destructive/30",
  "Reference":     "bg-secondary/15 text-secondary border-secondary/30",
  "Lab":           "bg-warning/15 text-warning border-warning/30",
  "Project":       "bg-purple-400/15 text-purple-300 border-purple-400/30",
  "Tutorial":      "bg-sky-400/15 text-sky-300 border-sky-400/30",
  "Other":         "bg-muted text-muted-foreground border-border",
};

// ── AI Pipeline ────────────────────────────────────────────────────────────────
export type PipelineStage = {
  id: number; title: string; status: "not_started" | "in_progress" | "completed";
};
export const INITIAL_PIPELINE: PipelineStage[] = [
  { id: 1, title: "Python & Math Fundamentals (Stats, Linear Algebra)",       status: "completed"   },
  { id: 2, title: "SQL, Databases & Data Preprocessing (DBMS Alignment)",     status: "in_progress" },
  { id: 3, title: "Classical Machine Learning Algorithms",                    status: "not_started" },
  { id: 4, title: "Deep Learning (PyTorch / TensorFlow)",                     status: "not_started" },
  { id: 5, title: "Bangla NLP & Transformers (Hugging Face)",                 status: "not_started" },
  { id: 6, title: "LLM Architectures, RAG & Retrieval Pipelines",             status: "not_started" },
  { id: 7, title: "MLOps, Model Deployment & AI Infrastructure Engineering",  status: "not_started" },
];

export type HCIPaperStage =
  | "Literature Review" | "Data Collection" | "Experimentation" | "Paper Drafting" | "Conference Submission";
export type HCITracker = { stage: HCIPaperStage; notes: string; papersPublished: number; };
export const INITIAL_HCI: HCITracker = { stage: "Literature Review", notes: "", papersPublished: 0 };

// ── Certificates ────────────────────────────────────────────────────────────────
export type CertProvider = "IBM" | "Coursera" | "Microsoft" | "Google" | "Other";
export type Certificate = {
  id: string; title: string; provider: CertProvider; platform: string;
  category: string; status: "Not Started" | "In Progress" | "Completed";
  completionDate: string; certificateUrl: string; credentialId: string; notes: string;
};
export const INITIAL_CERTIFICATES: Certificate[] = [
  { id:"c1",  title:"IBM AI Developer Professional Certificate",     provider:"IBM",      platform:"Coursera",                   category:"AI/ML",       status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"12-course series. Priority path." },
  { id:"c2",  title:"IBM Machine Learning Professional Certificate", provider:"IBM",      platform:"Coursera",                   category:"AI/ML",       status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"ML + Scikit-learn + IBM Watson." },
  { id:"c3",  title:"IBM Applied AI with Deep Learning",             provider:"IBM",      platform:"Coursera",                   category:"Deep Learning",status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Keras, PyTorch, TensorFlow." },
  { id:"c4",  title:"Deep Learning Specialization",                  provider:"Coursera", platform:"Coursera (DeepLearning.AI)", category:"Deep Learning",status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Andrew Ng. 5 courses." },
  { id:"c5",  title:"Machine Learning Specialization",               provider:"Coursera", platform:"Coursera (DeepLearning.AI)", category:"AI/ML",       status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Andrew Ng. 3 courses. Updated 2023." },
  { id:"c6",  title:"MLOps Specialization",                          provider:"Coursera", platform:"Coursera (DeepLearning.AI)", category:"MLOps",       status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"4-course series. CI/CD for ML." },
  { id:"c7",  title:"NLP Specialization",                            provider:"Coursera", platform:"Coursera (DeepLearning.AI)", category:"NLP",         status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"4 courses. Transformers, RAG." },
  { id:"c8",  title:"Azure AI Engineer Associate (AI-102)",           provider:"Microsoft",platform:"Microsoft Learn",             category:"Cloud AI",    status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Official MS cert. Highly valued." },
  { id:"c9",  title:"Azure Data Scientist Associate (DP-100)",        provider:"Microsoft",platform:"Microsoft Learn",             category:"Cloud AI",    status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"Azure ML Studio + Pipelines." },
  { id:"c10", title:"GitHub Copilot Fundamentals",                   provider:"Microsoft",platform:"Microsoft Learn",             category:"DevOps",      status:"Not Started", completionDate:"", certificateUrl:"", credentialId:"", notes:"AI-assisted coding. Quick win." },
];

// ── IELTS ──────────────────────────────────────────────────────────────────────
export type IELTSSegmentKey = "listening" | "reading" | "writing" | "speaking";

export type IELTSSegmentData = {
  currentBand: number;       // 0–9
  targetBand: number;        // 0–9
  cambridgeCompleted: number;// 0–20 (Cambridge 16–20, 4 tests each)
  notes: string;
  completed: boolean;        // segment fully practised to satisfaction
};

export type IELTSData = {
  testDate: string;          // planned exam date
  overallBand: number;       // last official/mock overall
  listening: IELTSSegmentData;
  reading:   IELTSSegmentData;
  writing:   IELTSSegmentData;
  speaking:  IELTSSegmentData;
};

export const INITIAL_IELTS: IELTSData = {
  testDate: "",
  overallBand: 0,
  listening: { currentBand: 0, targetBand: 8.0, cambridgeCompleted: 0, notes: "", completed: false },
  reading:   { currentBand: 0, targetBand: 8.0, cambridgeCompleted: 0, notes: "", completed: false },
  writing:   { currentBand: 0, targetBand: 7.0, cambridgeCompleted: 0, notes: "", completed: false },
  speaking:  { currentBand: 0, targetBand: 7.5, cambridgeCompleted: 0, notes: "", completed: false },
};

export type MockTestEntry = {
  id: string; date: string; source: string;
  listening: number; reading: number; writing: number; speaking: number;
  overall: number; notes: string;
};

// ── Scholarships (50) ─────────────────────────────────────────────────────────
export type Scholarship = {
  id: string; name: string; country: string; deadline: string;
  status: "Researching" | "Applying" | "Applied" | "Result";
  metRequirements: boolean; notes?: string;
};

export const INITIAL_SCHOLARSHIPS: Scholarship[] = [
  // ── USA ──
  { id:"s1",  name:"Fulbright Foreign Student Program",       country:"🇺🇸 USA",         deadline:"2028-10-15", status:"Researching", metRequirements:false, notes:"Fully funded MS/PhD. CGPA 3.7+ preferred. Strong SOP essential. Apply via US Embassy BD." },
  { id:"s2",  name:"NSF Graduate Research Fellowship",        country:"🇺🇸 USA",         deadline:"2028-10-18", status:"Researching", metRequirements:false, notes:"For PhD applicants. 3-year stipend $37k. Requires US institution admission first." },
  { id:"s3",  name:"Stanford Knight-Hennessy Scholars",       country:"🇺🇸 USA",         deadline:"2028-10-11", status:"Researching", metRequirements:false, notes:"Full funding for any Stanford graduate program. Leadership + vision focused." },
  { id:"s4",  name:"MIT Presidential Fellowship",             country:"🇺🇸 USA",         deadline:"2028-12-15", status:"Researching", metRequirements:false, notes:"With PhD admission. Research alignment with advisor is key." },
  { id:"s5",  name:"CMU Presidential Fellowship",             country:"🇺🇸 USA",         deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"Full funding with CMU PhD offer. AI/ML programs strong." },
  // ── UK ──
  { id:"s6",  name:"Chevening Scholarship",                   country:"🇬🇧 UK",          deadline:"2028-11-04", status:"Researching", metRequirements:false, notes:"Leadership-focused. 2 yrs work exp required. Strong LORs. Apply via FCO portal." },
  { id:"s7",  name:"Gates Cambridge Scholarship",             country:"🇬🇧 UK",          deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"Cambridge admission + Gates review. Most competitive. Academic excellence + social commitment." },
  { id:"s8",  name:"Commonwealth Shared Scholarship",         country:"🇬🇧 UK",          deadline:"2028-12-19", status:"Researching", metRequirements:false, notes:"For Bangladesh citizens. Taught master's programs. Apply via Commonwealth portal." },
  { id:"s9",  name:"Rhodes Scholarship",                      country:"🇬🇧 UK",          deadline:"2028-09-15", status:"Researching", metRequirements:false, notes:"Oxford only. Extremely competitive. Holistic: academics + leadership + athletics." },
  { id:"s10", name:"Scotland's Saltire Scholarship",          country:"🇬🇧 UK",          deadline:"2028-06-01", status:"Researching", metRequirements:false, notes:"£8k/year for Scottish universities. CS/Engineering eligible." },
  // ── Germany ──
  { id:"s11", name:"DAAD Research Grants",                    country:"🇩🇪 Germany",     deadline:"2028-10-31", status:"Researching", metRequirements:false, notes:"Research stays & full MS/PhD. German prof contact greatly helps. Apply via DAAD portal." },
  { id:"s12", name:"DAAD Graduate School Scholarship (GSSP)", country:"🇩🇪 Germany",     deadline:"2028-11-15", status:"Researching", metRequirements:false, notes:"For structured PhD programs at German universities." },
  { id:"s13", name:"Heinrich Böll Foundation",                country:"🇩🇪 Germany",     deadline:"2029-01-01", status:"Researching", metRequirements:false, notes:"Green/progressive values. MS & PhD. ~€850/mo stipend. Apply 1 year before start." },
  { id:"s14", name:"Konrad Adenauer Foundation",              country:"🇩🇪 Germany",     deadline:"2028-07-15", status:"Researching", metRequirements:false, notes:"Conservative values. PhD preferred. CGPA + Christian Democratic alignment." },
  { id:"s15", name:"Friedrich Ebert Foundation",              country:"🇩🇪 Germany",     deadline:"2028-10-01", status:"Researching", metRequirements:false, notes:"Social democratic. PhD & postdoc. Strong social/political engagement required." },
  // ── EU & Multi-country ──
  { id:"s16", name:"Erasmus Mundus Joint Master Degree",      country:"🇪🇺 EU",          deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"Study in 2+ EU countries. Multiple AI/CS programs available. Fully funded incl. travel." },
  { id:"s17", name:"Erasmus+ Study Abroad",                   country:"🇪🇺 EU",          deadline:"2028-03-31", status:"Researching", metRequirements:false, notes:"Requires UIU bilateral agreement. Check UIU Int'l Office. Partial funding." },
  { id:"s18", name:"Marie Skłodowska-Curie Fellowship",       country:"🇪🇺 EU",          deadline:"2028-09-11", status:"Researching", metRequirements:false, notes:"PhD/postdoc. Research-intensive. Apply through European host institution." },
  { id:"s19", name:"EIT Digital Master School",               country:"🇪🇺 EU",          deadline:"2029-02-01", status:"Researching", metRequirements:false, notes:"2-year master in AI, Data Science etc. Two EU universities. Partial scholarships." },
  // ── Switzerland ──
  { id:"s20", name:"ETH Zurich Excellence Scholarship",       country:"🇨🇭 Switzerland", deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"ETH direct admission required first. ~CHF 12k/semester. Top AI research globally." },
  { id:"s21", name:"EPFL Excellence Fellowship",              country:"🇨🇭 Switzerland", deadline:"2028-11-15", status:"Researching", metRequirements:false, notes:"PhD at EPFL. Full salary ~CHF 55k/year. Apply with research proposal." },
  { id:"s22", name:"Swiss Government Excellence Scholarship", country:"🇨🇭 Switzerland", deadline:"2028-12-15", status:"Researching", metRequirements:false, notes:"Apply via Bangladesh MoFA. Research & postdoc. Host university needed." },
  // ── Netherlands ──
  { id:"s23", name:"Holland Scholarship",                     country:"🇳🇱 Netherlands", deadline:"2029-02-01", status:"Researching", metRequirements:false, notes:"€5k one-time for TU Delft, Leiden, Erasmus etc. Non-EEA students eligible." },
  { id:"s24", name:"Orange Knowledge Programme (OKP)",        country:"🇳🇱 Netherlands", deadline:"2028-09-30", status:"Researching", metRequirements:false, notes:"For developing countries incl. Bangladesh. Specific courses/universities listed." },
  // ── Sweden ──
  { id:"s25", name:"Swedish Institute Scholarship",           country:"🇸🇪 Sweden",      deadline:"2029-02-14", status:"Researching", metRequirements:false, notes:"Full fund. Leadership + sustainability focus. Master's at Swedish universities." },
  { id:"s26", name:"SIDA Research Links",                     country:"🇸🇪 Sweden",      deadline:"2028-09-01", status:"Researching", metRequirements:false, notes:"Research collaboration. PhD students via supervisor. Long-term engagement." },
  // ── Norway ──
  { id:"s27", name:"NORPART (Norway-Bangladesh)",             country:"🇳🇴 Norway",      deadline:"2028-10-01", status:"Researching", metRequirements:false, notes:"Exchange/research. Must be via institution partnership." },
  { id:"s28", name:"Quota Scheme Norway (HK-dir)",            country:"🇳🇴 Norway",      deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"For developing countries. Living allowance NOK ~11k/month." },
  // ── Japan ──
  { id:"s29", name:"MEXT Japanese Government Scholarship",    country:"🇯🇵 Japan",       deadline:"2028-05-31", status:"Researching", metRequirements:false, notes:"Apply via Japanese Embassy BD. Research + master's track. Full fund. JLPT not required." },
  { id:"s30", name:"JASSO Student Exchange Support",          country:"🇯🇵 Japan",       deadline:"2028-06-30", status:"Researching", metRequirements:false, notes:"Exchange via university partnership. ¥80k/month allowance." },
  { id:"s31", name:"ADB–Japan Scholarship Program",           country:"🇯🇵 Japan",       deadline:"2028-04-30", status:"Researching", metRequirements:false, notes:"2-yr work experience required. ADB member developing countries. Full fund." },
  // ── South Korea ──
  { id:"s32", name:"Korean Government Scholarship (KGSP)",    country:"🇰🇷 South Korea", deadline:"2028-09-30", status:"Researching", metRequirements:false, notes:"Full fund. KAIST, POSTECH, KAIST options. Korean language 1yr then English. AI research." },
  { id:"s33", name:"POSTECH International Fellowship",        country:"🇰🇷 South Korea", deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"Full stipend at POSTECH. Strong AI/ML + robotics research programs." },
  { id:"s34", name:"KAIST Graduate Fellowship",               country:"🇰🇷 South Korea", deadline:"2028-11-30", status:"Researching", metRequirements:false, notes:"Stipend + tuition waiver. AI/CS research groups very strong." },
  // ── Singapore ──
  { id:"s35", name:"NUS Research Scholarship",                country:"🇸🇬 Singapore",   deadline:"2028-11-15", status:"Researching", metRequirements:false, notes:"Full fund. Monthly stipend SGD 2,700. AI/ML dept excellent. 4-yr PhD." },
  { id:"s36", name:"NTU Research Scholarship",                country:"🇸🇬 Singapore",   deadline:"2028-11-30", status:"Researching", metRequirements:false, notes:"SGD 2,300/month + tuition waiver. NTU AI/Data Science programs." },
  // ── Australia ──
  { id:"s37", name:"Australia Awards Scholarship",            country:"🇦🇺 Australia",   deadline:"2028-04-30", status:"Researching", metRequirements:false, notes:"For Bangladesh citizens. Managed by DFAT. Full fund including flights. Prestigious." },
  { id:"s38", name:"Endeavour Leadership Program",            country:"🇦🇺 Australia",   deadline:"2028-06-30", status:"Researching", metRequirements:false, notes:"Research & vocational. AUD 272k max for PhD. Check DFAT website for 2029 opening." },
  // ── Canada ──
  { id:"s39", name:"Vanier Canada Graduate Scholarship",      country:"🇨🇦 Canada",      deadline:"2028-11-06", status:"Researching", metRequirements:false, notes:"CAD 50k/year for 3 yrs. Must be nominated by Canadian university. PhD only." },
  { id:"s40", name:"Trudeau Foundation Scholarship",          country:"🇨🇦 Canada",      deadline:"2028-12-01", status:"Researching", metRequirements:false, notes:"Social science/humanities leaning. PhD at Canadian university. CAD 40k/year." },
  // ── China ──
  { id:"s41", name:"Chinese Government Scholarship (CSC)",    country:"🇨🇳 China",       deadline:"2028-04-30", status:"Researching", metRequirements:false, notes:"Full fund. Apply via Chinese Embassy BD. Tsinghua, Zhejiang, SJTU options for AI." },
  { id:"s42", name:"Confucius Institute Scholarship",         country:"🇨🇳 China",       deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"Language-focused. Partial fund. Good for networking + Mandarin learning." },
  // ── Turkey ──
  { id:"s43", name:"Türkiye Bursları (YTB Scholarship)",      country:"🇹🇷 Turkey",      deadline:"2029-02-20", status:"Researching", metRequirements:false, notes:"Fully funded. Monthly stipend TRY + accommodation. MS & PhD. English-medium programs." },
  // ── Hungary ──
  { id:"s44", name:"Stipendium Hungaricum",                   country:"🇭🇺 Hungary",     deadline:"2029-01-15", status:"Researching", metRequirements:false, notes:"Apply via Bangladesh MoFA. Full fund. University of Debrecen, Budapest etc." },
  // ── France ──
  { id:"s45", name:"Eiffel Excellence Scholarship",           country:"🇫🇷 France",      deadline:"2029-01-08", status:"Researching", metRequirements:false, notes:"Master's & PhD. Top French institutions. €1,181/month + housing allowance." },
  // ── Belgium ──
  { id:"s46", name:"VLIR-UOS Scholarship",                    country:"🇧🇪 Belgium",     deadline:"2029-02-01", status:"Researching", metRequirements:false, notes:"For developing countries. Selected Belgian universities & programs. Full fund." },
  // ── Taiwan ──
  { id:"s47", name:"Taiwan ICDF Scholarship",                 country:"🇹🇼 Taiwan",      deadline:"2029-03-14", status:"Researching", metRequirements:false, notes:"NTHU, NCTU (Yang Ming Chiao Tung). Engineering/CS. Full fund. English-medium." },
  // ── Czech Republic ──
  { id:"s48", name:"Czech Government Scholarship (DZS)",      country:"🇨🇿 Czechia",    deadline:"2029-02-28", status:"Researching", metRequirements:false, notes:"Via Czech Embassy BD. CTU Prague, Brno UT. Engineering/CS. Full fund." },
  // ── Saudi Arabia ──
  { id:"s49", name:"KAUST Fellowship",                        country:"🇸🇦 Saudi Arabia",deadline:"2028-12-15", status:"Researching", metRequirements:false, notes:"KAUST is world-class AI/CS. Full fund + SAR stipend. English medium. Strong CS faculty." },
  // ── Malaysia ──
  { id:"s50", name:"Malaysia Technical Cooperation (MTCP)",   country:"🇲🇾 Malaysia",    deadline:"2028-11-30", status:"Researching", metRequirements:false, notes:"UM, UTM, UPM. For developing countries. Apply via Bangladesh MoFA." },
];

// ── Documents ─────────────────────────────────────────────────────────────────
export type DocumentChecklist = {
  id: string; task: string; status: "Not Started" | "In Progress" | "Done"; meta?: string;
};
export const INITIAL_DOCUMENTS: DocumentChecklist[] = [
  { id:"1",  task:"Passport & NID Name Correction",          status:"Not Started", meta:"Verify spelling alignment"     },
  { id:"2",  task:"Academic Transcripts",                    status:"Not Started", meta:"Official from Registrar office" },
  { id:"3",  task:"SSC/HSC Certificates collection",         status:"Done"                                              },
  { id:"4",  task:"Certificate Attestation",                 status:"Not Started", meta:"Education & Foreign Ministry"  },
  { id:"5",  task:"SOP (Statement of Purpose) Master Draft", status:"In Progress"                                       },
  { id:"6",  task:"LOR Professor 1",                         status:"Not Started"                                       },
  { id:"7",  task:"LOR Professor 2",                         status:"Not Started"                                       },
  { id:"8",  task:"LOR Professor 3",                         status:"Not Started"                                       },
  { id:"9",  task:"CV / Academic Resume",                    status:"In Progress", meta:"ATS-optimized"                 },
  { id:"10", task:"Research Statement",                      status:"Not Started"                                       },
];

export type Internship = {
  id: string; name: string; deadline: string;
  status: "Not Applied" | "Applied" | "Interview" | "Accepted" | "Rejected"; notes: string;
};
export const INITIAL_INTERNSHIPS: Internship[] = [
  { id:"1", name:"Microsoft Learn Student Ambassador (MLSA)", deadline:"Rolling",    status:"Not Applied", notes:"" },
  { id:"2", name:"Google Developer Group (GDG)",              deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"3", name:"IBM Community Student Lead",                deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"4", name:"Coursera Campus Partner",                   deadline:"TBA",        status:"Not Applied", notes:"" },
  { id:"5", name:"NASA Internship",                           deadline:"2028-11-01", status:"Not Applied", notes:"" },
];

export type DistractionLog = {
  academics: number; ai: number; research: number; quran: number;
  ielts: number; familyBuffer: number; waste: number;
};
export const INITIAL_DISTRACTION_LOG: DistractionLog = {
  academics:20, ai:15, research:5, quran:7, ielts:5, familyBuffer:7, waste:2,
};

export type DailyQuranRecord = {
  date: string; implemented: boolean; ayah: string; meaning: string; reflection: string;
  prayers: { fajr:boolean; dhuhr:boolean; asr:boolean; maghrib:boolean; isha:boolean; };
};

// ── Store hook ─────────────────────────────────────────────────────────────────
export function useAppStore() {
  const [courses, setCourses]                   = useLocalStorage<Course[]>            ("life_tracker_courses",           INITIAL_COURSES);
  const [currentTrimester, setCurrentTrimester] = useLocalStorage<string>              ("life_tracker_current_trimester",  INITIAL_CURRENT_TRIMESTER);
  const [reviews, setReviews]                   = useLocalStorage<SelfReview[]>        ("life_tracker_reviews",            INITIAL_REVIEWS);
  const [noteLinks, setNoteLinks]               = useLocalStorage<NoteLink[]>          ("life_tracker_note_links",         []);
  const [pipeline, setPipeline]                 = useLocalStorage<PipelineStage[]>     ("life_tracker_pipeline",           INITIAL_PIPELINE);
  const [hci, setHci]                           = useLocalStorage<HCITracker>          ("life_tracker_hci",                INITIAL_HCI);
  const [distractionLog, setDistractionLog]     = useLocalStorage<DistractionLog>      ("life_tracker_distractions",       INITIAL_DISTRACTION_LOG);
  const [documents, setDocuments]               = useLocalStorage<DocumentChecklist[]> ("life_tracker_documents",          INITIAL_DOCUMENTS);
  const [scholarships, setScholarships]         = useLocalStorage<Scholarship[]>       ("life_tracker_scholarships",       INITIAL_SCHOLARSHIPS);
  const [internships, setInternships]           = useLocalStorage<Internship[]>        ("life_tracker_internships",        INITIAL_INTERNSHIPS);
  const [certificates, setCertificates]         = useLocalStorage<Certificate[]>       ("life_tracker_certificates",       INITIAL_CERTIFICATES);
  const [ielts, setIelts]                       = useLocalStorage<IELTSData>           ("life_tracker_ielts",              INITIAL_IELTS);
  const [mockTests, setMockTests]               = useLocalStorage<MockTestEntry[]>     ("life_tracker_mock_tests",         []);
  const [vocab, setVocab]                       = useLocalStorage<{word:string;date:string}[]>("life_tracker_vocab",       []);
  const [cambridgeTests, setCambridgeTests]     = useLocalStorage<number>              ("life_tracker_cambridge_tests",    0);
  const [spiritualLogs, setSpiritualLogs]       = useLocalStorage<Record<string, DailyQuranRecord>>("life_tracker_spiritual", {});

  return {
    courses, setCourses,
    currentTrimester, setCurrentTrimester,
    reviews, setReviews,
    noteLinks, setNoteLinks,
    pipeline, setPipeline,
    hci, setHci,
    distractionLog, setDistractionLog,
    documents, setDocuments,
    scholarships, setScholarships,
    internships, setInternships,
    certificates, setCertificates,
    ielts, setIelts,
    mockTests, setMockTests,
    vocab, setVocab,
    cambridgeTests, setCambridgeTests,
    spiritualLogs, setSpiritualLogs,
  };
}
