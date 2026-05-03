import React, { useState } from 'react';
import { Book, Monitor, Cpu, ArrowRight, Info, Code, FileQuestion, Share2 } from 'lucide-react';

export default function LessonApp() {
    const [activeTab, setActiveTab] = useState('mvc'); // 'mvc' หรือ 'uml'

    // สถานะสำหรับการเลือกในแท็บ UML
    const [selectionType, setSelectionType] = useState('class'); // 'class' หรือ 'relation'
    const [selectedLayer, setSelectedLayer] = useState('Model');
    const [selectedClass, setSelectedClass] = useState('Book');
    const [selectedRelation, setSelectedRelation] = useState('rel1');

    // ฐานข้อมูลเนื้อหา (ภาษาไทย)
    const architectureData = {
        Model: {
            color: 'bg-green-100 border-green-400 text-green-800',
            icon: <Book className="text-green-600" size={24} />,
            title: 'Model (จัดการข้อมูลและกฎเกณฑ์)',
            description: 'Model คือส่วนสมองของโปรแกรม รับหน้าที่จัดการข้อมูล (หนังสือ, สมาชิก, รายการยืม) และบังคับใช้กฎของระบบ (เช่น "ยืมไม่ได้ถ้าจำนวนหนังสือเหลือ 0")',
            rule: 'กฎเหล็ก: Model ห้ามพิมพ์ข้อความออกทางหน้าจอ (Console) เด็ดขาด! ห้ามมี System.out.println() ในส่วนนี้',
            classes: [
                {
                    name: 'Book',
                    concept: 'การห่อหุ้มข้อมูล (Encapsulation)',
                    uml: `- bookId : String\n- title : String\n- availableCopies : int\n\n+ isAvailable() : boolean\n+ getBookId() : String`,
                    code: `public class Book {\n  // (-) ฟิลด์เป็น private (Encapsulation)\n  private String bookId;\n  private String title;\n  private int availableCopies;\n\n  // (+) เมธอดเป็น public\n  public boolean isAvailable() {\n    return availableCopies > 0;\n  }\n}`,
                    explanation: `สังเกตว่าเครื่องหมายลบ (-) ใน UML จะกลายเป็นคำว่า 'private' ใน Java และเครื่องหมายบวก (+) จะกลายเป็น 'public' วิธีนี้ช่วยปกป้องข้อมูลไม่ให้ถูกแก้ไขจากภายนอกโดยตรง!`
                },
                {
                    name: 'Loan',
                    concept: 'คลาสตัวกลางเก็บสถานะ (State & Rules)',
                    uml: `- loanId : String\n- book : Book\n- member : Member\n- borrowDate : LocalDate\n\n+ calculateFine() : double`,
                    code: `public class Loan {\n  private String loanId;\n  private Book book;\n  private Member member;\n  private LocalDate borrowDate;\n\n  public double calculateFine() {\n    // ตรรกะคำนวณค่าปรับ...\n  }\n}`,
                    explanation: `คลาส Loan ทำหน้าที่เชื่อมระหว่างผู้ใช้ (Member) กับหนังสือ (Book) และมีเมธอด calculateFine() เพื่อประมวลผลตรรกะทางธุรกิจ (Business Logic)`
                },
                {
                    name: 'Library',
                    concept: 'จุดศูนย์รวมข้อมูล (Aggregate Root)',
                    uml: `- books : List<Book>\n- members : List<Member>\n- loans : List<Loan>\n\n+ findBook(id) : Book`,
                    code: `import java.util.List;\n\npublic class Library {\n  // เป็นศูนย์รวมของ List ข้อมูลต่างๆ\n  private List<Book> books;\n  private List<Member> members;\n  private List<Loan> loans;\n\n  public Book findBook(String id) {\n    // วนลูปหาหนังสือใน List\n  }\n}`,
                    explanation: `คลาสนี้เปรียบเสมือนฐานข้อมูลจำลองของระบบ (Database) ที่เก็บคอลเล็กชันของอ็อบเจกต์ทั้งหมดเอาไว้`
                }
            ]
        },
        View: {
            color: 'bg-blue-100 border-blue-400 text-blue-800',
            icon: <Monitor className="text-blue-600" size={24} />,
            title: 'View (ส่วนติดต่อผู้ใช้)',
            description: 'View จัดการการโต้ตอบกับผู้ใช้ทั้งหมด เช่น พิมพ์เมนู แสดงข้อความผิดพลาด และรับค่าจากคีย์บอร์ด จะไม่มีการประมวลผลตรรกะที่นี่',
            rule: 'กฎเหล็ก: นี่คือที่เดียวที่อนุญาตให้ใช้ Scanner (รับค่า) และ System.out.println (แสดงผล)',
            classes: [
                {
                    name: 'LibraryView',
                    concept: 'การรับส่งข้อมูล (I/O Handling)',
                    uml: `+ showMenu() : int\n+ readBookInput() : Book\n+ displayBooks(list) : void\n+ showError(msg) : void`,
                    code: `import java.util.Scanner;\n\npublic class LibraryView {\n  private Scanner scanner = new Scanner(System.in);\n\n  public int showMenu() {\n    System.out.println("1. Add Book");\n    System.out.println("2. Borrow Book");\n    return scanner.nextInt();\n  }\n\n  public void showError(String msg) {\n    System.out.println("ERROR: " + msg);\n  }\n}`,
                    explanation: `View จัดการสิ่งที่ผู้ใช้จะมองเห็นเท่านั้น หาก Controller ต้องการแสดงข้อผิดพลาด ก็จะส่งแค่ข้อความ (String) มาให้เมธอด showError() ทำหน้าที่พิมพ์`
                }
            ]
        },
        Controller: {
            color: 'bg-orange-100 border-orange-400 text-orange-800',
            icon: <Cpu className="text-orange-600" size={24} />,
            title: 'Controller (ผู้ควบคุมและประสานงาน)',
            description: 'Controller เชื่อมต่อ View และ Model เข้าด้วยกัน รับคำสั่งจากผู้ใช้ (ผ่าน View) ไปอัปเดตข้อมูล (ผ่าน Model) และสั่งให้ View แสดงผลลัพธ์',
            rule: 'กฎเหล็ก: Controller ต้องถืออ้างอิง (Reference) ของทั้ง View และ Model',
            classes: [
                {
                    name: 'LibraryController',
                    concept: 'การประสานงาน (Orchestration)',
                    uml: `- library : Library\n- view : LibraryView\n\n+ run() : void\n+ borrowBook() : void`,
                    code: `public class LibraryController {\n  private Library library;   // The Model\n  private LibraryView view;  // The View\n\n  public void run() {\n    int choice = view.showMenu();\n    if (choice == 1) {\n      borrowBook();\n    }\n  }\n\n  public void borrowBook() {\n    // 1. รับค่าจาก View\n    // 2. อัปเดตตรรกะใน Model\n    // 3. สั่ง View แสดงผลลัพธ์\n  }\n}`,
                    explanation: `Controller เปรียบเสมือนผู้จัดการ (Manager) ที่คอยบอกว่า View ต้องทำงานตอนไหน และ Model ต้องอัปเดตข้อมูลเมื่อไหร่`
                }
            ]
        }
    };

    const relationshipsData = [
        {
            id: 'rel1',
            name: 'Library <>-> Book (Aggregation)',
            concept: 'ความสัมพันธ์แบบ Aggregation (การรวมกลุ่ม)',
            uml: `Library   <>---------------->   Book\n                  * books`,
            code: `public class Library {\n  // เพชรกลวง (Aggregation) แปลงเป็น List ใน Java\n  private List<Book> books;\n}`,
            explanation: 'สัญลักษณ์ลูกศรข้าวหลามตัดโปร่ง (Aggregation) ชี้จาก Library ไปหา Book พร้อมเครื่องหมายดอกจัน (*) หมายความว่า 1 Library มี Book ได้หลายเล่ม ในโค้ด Java จะถูกแปลงเป็นการประกาศคอลเล็กชัน เช่น `List<Book>`'
        },
        {
            id: 'rel2',
            name: 'Loan -> Book (Association)',
            concept: 'ความสัมพันธ์แบบ Association (การเชื่อมโยง)',
            uml: `Loan   ------------------>   Book\n                 1 book`,
            code: `public class Loan {\n  // เส้นทึบ (Association) อ้างอิงถึง 1 อ็อบเจกต์\n  private Book book;\n}`,
            explanation: 'เส้นทึบมีหัวลูกศรจาก Loan ไปหา Book พร้อมเลข 1 หมายความว่า 1 รายการยืม (Loan) จะเชื่อมโยงกับหนังสือ 1 เล่ม ใน Java จะประกาศเป็นตัวแปรอ้างอิงอ็อบเจกต์ตรงๆ คือ `private Book book;`'
        },
        {
            id: 'rel3',
            name: 'Controller ..> View (Dependency)',
            concept: 'ความสัมพันธ์แบบ Dependency (การพึ่งพา)',
            uml: `LibraryController   .. - - - - >   LibraryView\n                             uses`,
            code: `public class LibraryController {\n  // ประกาศตัวแปรเพื่อใช้เรียกเมธอดของ View\n  private LibraryView view;\n\n  public void run() {\n    int choice = view.showMenu(); // เรียกใช้งาน\n  }\n}`,
            explanation: 'เส้นประ (Dependency) พร้อมคำว่า uses หมายความว่า Controller จำเป็นต้อง "เรียกใช้" หรือพึ่งพา View เพื่อทำงานให้สำเร็จลุล่วง'
        }
    ];

    // เตรียมข้อมูลสำหรับแสดงผลในฝั่งขวา
    let displayData = null;
    let themeColor = 'bg-slate-100 border-slate-400 text-slate-800';

    if (selectionType === 'class') {
        const layerData = architectureData[selectedLayer];
        displayData = layerData.classes.find(c => c.name === selectedClass);
        themeColor = layerData.color;
    } else {
        displayData = relationshipsData.find(r => r.id === selectedRelation);
        themeColor = 'bg-pink-100 border-pink-400 text-pink-800';
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <FileQuestion className="text-indigo-500" />
                        บทเรียน Interactive: UML และ MVC
                    </h1>
                    <p className="text-slate-600 mt-2">
                        เรียนรู้วิธีการแปลง Class Diagram จากโจทย์สอบให้กลายเป็นโครงสร้างโค้ด Java ได้อย่างถูกต้อง
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-4 mt-6 border-b border-slate-200 pb-2">
                        <button
                            className={`pb-2 font-semibold transition-colors ${activeTab === 'mvc' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                            onClick={() => setActiveTab('mvc')}
                        >
                            1. สรุปโครงสร้าง MVC
                        </button>
                        <button
                            className={`pb-2 font-semibold transition-colors ${activeTab === 'uml' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                            onClick={() => { setActiveTab('uml'); setSelectionType('class'); setSelectedLayer('Model'); setSelectedClass('Book'); }}
                        >
                            2. ถอดรหัส UML เป็นโค้ด Java
                        </button>
                    </div>
                </div>

                {/* TAB 1: MVC Breakdown */}
                {activeTab === 'mvc' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.keys(architectureData).map(layer => (
                            <div
                                key={layer}
                                className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${architectureData[layer].color} ${selectionType === 'class' && selectedLayer === layer ? 'ring-4 ring-opacity-50 ring-indigo-400' : 'opacity-90'}`}
                                onClick={() => { setActiveTab('uml'); setSelectionType('class'); setSelectedLayer(layer); setSelectedClass(architectureData[layer].classes[0].name); }}
                            >
                                <div className="flex items-center gap-3 mb-4 font-bold text-xl">
                                    {architectureData[layer].icon}
                                    {architectureData[layer].title}
                                </div>
                                <p className="text-sm font-medium opacity-90 mb-4 h-28">
                                    {architectureData[layer].description}
                                </p>
                                <div className="bg-white/60 p-3 rounded-lg text-xs font-bold shadow-inner text-red-700">
                                    {architectureData[layer].rule}
                                </div>
                            </div>
                        ))}

                        <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4">
                            <div className="flex-1 text-center md:border-r border-slate-100 md:pr-6">
                                <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-full mb-2">
                                    <Monitor size={32} />
                                </div>
                                <h3 className="font-bold text-sm">1. ผู้ใช้สั่งการ</h3>
                                <p className="text-xs text-slate-500 mt-1">View แสดงเมนู,<br />ผู้ใช้พิมพ์ '3' (ยืมหนังสือ)</p>
                            </div>
                            <ArrowRight className="text-slate-300 flex-shrink-0 hidden md:block" />
                            <div className="flex-1 text-center md:border-r border-slate-100 md:px-6">
                                <div className="inline-flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-full mb-2">
                                    <Cpu size={32} />
                                </div>
                                <h3 className="font-bold text-sm">2. Controller ประมวลผล</h3>
                                <p className="text-xs text-slate-500 mt-1">Controller รับคำสั่ง นำไปตรวจสอบกับ Model ว่ามีหนังสือหรือไม่</p>
                            </div>
                            <ArrowRight className="text-slate-300 flex-shrink-0 hidden md:block" />
                            <div className="flex-1 text-center md:pl-6">
                                <div className="inline-flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-full mb-2">
                                    <Book size={32} />
                                </div>
                                <h3 className="font-bold text-sm">3. Model อัปเดตข้อมูล</h3>
                                <p className="text-xs text-slate-500 mt-1">Model ลดจำนวนหนังสือ Controller จึงสั่ง View ให้แสดงข้อความสำเร็จ</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: UML to Java */}
                {activeTab === 'uml' && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden min-h-[550px]">

                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto">

                            {/* Section 1: Classes */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                    <Code size={14} /> โครงสร้างคลาส (Classes)
                                </h3>
                                {['Model', 'View', 'Controller'].map(layer => (
                                    <div key={layer} className="mb-3">
                                        <div className={`text-xs font-bold mb-1 ${layer === 'Model' ? 'text-green-600' : layer === 'View' ? 'text-blue-600' : 'text-orange-600'}`}>
                                            {architectureData[layer].title.split(' ')[0]} Layer
                                        </div>
                                        {architectureData[layer].classes.map(cls => (
                                            <button
                                                key={cls.name}
                                                onClick={() => { setSelectionType('class'); setSelectedLayer(layer); setSelectedClass(cls.name); }}
                                                className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${selectionType === 'class' && selectedClass === cls.name ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-slate-200 text-slate-600'}`}
                                            >
                                                {cls.name}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Section 2: Relationships */}
                            <div className="border-t border-slate-200 pt-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                    <Share2 size={14} /> ความสัมพันธ์ (Relationships)
                                </h3>
                                <div className="space-y-1">
                                    {relationshipsData.map(rel => (
                                        <button
                                            key={rel.id}
                                            onClick={() => { setSelectionType('relation'); setSelectedRelation(rel.id); }}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors leading-tight ${selectionType === 'relation' && selectedRelation === rel.id ? 'bg-pink-100 text-pink-700 font-semibold' : 'hover:bg-slate-200 text-slate-600'}`}
                                        >
                                            {rel.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-6 flex flex-col bg-white">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {displayData.name}
                                    </h2>
                                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
                                        แนวคิด: {displayData.concept}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                                {/* UML Side */}
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Monitor size={18} /> แผนภาพ UML
                                    </h3>
                                    <div className={`flex-1 rounded-lg border-2 p-4 font-mono text-sm whitespace-pre-wrap ${themeColor.split(' ')[0]} ${themeColor.split(' ')[1]} flex items-center justify-center`}>
                                        <div className="w-full">
                                            {selectionType === 'class' && (
                                                <div className="font-bold text-center border-b-2 border-current pb-2 mb-2 bg-white/40 p-1 rounded">
                                                    {displayData.name}
                                                </div>
                                            )}
                                            <div className={selectionType === 'relation' ? 'font-bold text-center bg-white/50 p-4 rounded-lg' : ''}>
                                                {displayData.uml}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Java Side */}
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Code size={18} /> โค้ด Java
                                    </h3>
                                    <div className="flex-1 bg-slate-900 text-slate-300 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                                        {displayData.code}
                                    </div>
                                </div>
                            </div>

                            {/* Explanation Box */}
                            <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex gap-4 items-start">
                                <Info className="text-indigo-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                                    {displayData.explanation}
                                </p>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}