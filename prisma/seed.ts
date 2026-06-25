import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Memulai proses seeding database Lumenary...");

    // 1. DATA KATEGORI BUKU (Sudah di-mapping dengan ID yang benar)
    const kategoriBuku = [
        { id_kategori: 1, nama_kategori: "Technology & Computer Science", deskripsi: "Books covering software engineering, programming languages, algorithms, artificial intelligence, cyber security, and computer systems." },
        { id_kategori: 2, nama_kategori: "Economic & Business", deskripsi: "Literature focusing on macro and microeconomics, financial systems, entrepreneurship, marketing, and corporate management strategies." },
        { id_kategori: 3, nama_kategori: "Psychology & Behavioral Science", deskripsi: "Works exploring human cognition, emotion, mental health, psychological theories, and the underlying social behaviors of individuals." },
        { id_kategori: 4, nama_kategori: "Communication & Media Studies", deskripsi: "Publications analyzing mass communication, digital media, journalism, public relations, and the evolution of human interaction." },
        { id_kategori: 5, nama_kategori: "Engineering & Architecture", deskripsi: "Technical and theoretical guides on civil, mechanical, electrical engineering, as well as structural design and spatial architecture." },
        { id_kategori: 6, nama_kategori: "Self-Development", deskripsi: "Practical and motivational books focusing on personal growth, habit formation, productivity, time management, and leadership." },
        { id_kategori: 7, nama_kategori: "Languages & Literature", deskripsi: "Texts studying linguistics, language acquisition, and critical academic analyses of classic and contemporary literary works." },
        { id_kategori: 8, nama_kategori: "History & Philosophy", deskripsi: "Comprehensive explorations of past human civilizations, major historical events, philosophical thoughts, ethics, and logic." },
        { id_kategori: 9, nama_kategori: "Science & Mathematics", deskripsi: "Fundamental and advanced textbooks in physics, chemistry, biology, mathematics, statistics, and cosmic science." },
        { id_kategori: 10, nama_kategori: "Biographies & Autobiographies", deskripsi: "Detailed and inspiring accounts of real people's lives, written either by another author or by the subjects themselves." },
        { id_kategori: 11, nama_kategori: "Fictions", deskripsi: "Narrative literature created from the imagination, including classic novels, sci-fi, fantasy, drama, and various creative genres." }
    ];

    console.log("Menyimpan data kategori...");
    for (const kat of kategoriBuku) {
        await prisma.kategori.upsert({
            where: { id_kategori: kat.id_kategori },
            update: {},
            create: kat
        });
    }

    // 2. DATA BUKU UTAMA
    const booksData = [
        {
            judul: "Project Hail Mary",
            penulis: "Andy Weir",
            penerbit: "Ballantine Books",
            tahun_terbit: 2021,
            isbn: "978-0-59-313520-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/hail_mary_cover.jpg",
            sinopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company. His crewmates dead, his memories fuzzily returning, Ryland realizes that an impossible task now confronts him. Hurtling through space on this tiny ship, it's up to him to puzzle out an impossible scientific mystery—and conquer an extinction-level threat to our species. And with the clock ticking down and the nearest human being light-years away, he's got to do it all alone. Or does he?",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "The Kite Runner",
            penulis: "Khaled Hosseini",
            penerbit: "Riverhead Books",
            tahun_terbit: 2013,
            isbn: "978-1-59-448000-3",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/kite_runner_cover.jpg",
            sinopsis: "The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant, The Kite Runner is a beautifully crafted novel set in a country that is in the process of being destroyed. It is about the power of reading, the price of betrayal, and the possibility of redemption; and an exploration of the power of fathers over sons—their love, their sacrifices, their lies. A sweeping story of family, love, and friendship told against the devastating backdrop of the history of Afghanistan over the last thirty years, The Kite Runner is an unusual and powerful novel that has become a beloved, one-of-a-kind classic.The 10th anniversary edition of the New York Times bestseller and international classic loved by millions of readers.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 7 } }
        },
        {
            judul: "Introduction to Algorithms",
            penulis: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
            penerbit: "MIT Press",
            tahun_terbit: 2001,
            isbn: "978-0-26-203293-3",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/algorithm_cover.jpg",
            sinopsis: "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers, with self-contained chapters and algorithms in pseudocode. Since the publication of the first edition, Introduction to Algorithms has become the leading algorithms text in universities worldwide as well as the standard reference for professionals. This fourth edition has been updated throughout. New for the fourth edition chapters on matchings in bipartite graphs, online algorithms, and machine learningNew material on topics including solving recurrence equations, hash tables, potential functions, and suffix arrays140 new exercises and 22 new problemsReader feedback-informed improvements to old problemsClearer, more personal, and gender-neutral writing styleColor added to improve visual presentationNotes, bibliography, and index updated to reflect developments in the fieldWebsite with new supplementary material Warning: Avoid counterfeit copies of Introduction to Algorithms by buying only from reputable retailers. Counterfeit and pirated copies are incomplete and contain errors.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 1 } }
        },
        {
            judul: "Clean Code: A Handbook of Agile Software Craftsmanship",
            penulis: "Robert C. Martin",
            penerbit: "Pearson Education",
            tahun_terbit: 2008,
            isbn: "978-0-13-235088-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/clean_code_cover.jpg",
            sinopsis: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code on the fly into a book that will instill within you the values of a software craftsman and make you a better programmer but only if you work at it. What kind of work will you be doing? You'll be reading code - lots of code. And you will be challenged to think about what's right about that code, and what's wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft. Clean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code - of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and 'smells' gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code. Readers will come away from this book understanding, How to tell the difference between good and bad code, How to write good code and how to transform bad code into good code, How to create good names, good functions, good objects, and good classes, How to format code for maximum readability, How to implement complete error handling without obscuring code logic, How to unit test and practice test-driven development This book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 5 } }
        },
        {
            judul: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
            penulis: "James Clear",
            penerbit: "Avery",
            tahun_terbit: 2018,
            isbn: "978-0-73-521129-2",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/atomic_habits_cover.jpg",
            sinopsis: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field. Learn how to: Make time for new habits (even when life gets crazy);, Overcome a lack of motivation and willpower;, Design your environment to make success easier;, Get back on track when you fall off course;and much more. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 6 } }
        },
        {
            judul: "Pride and Prejudice",
            penulis: "Jane Austen",
            penerbit: "Peter Pauper Press",
            tahun_terbit: 2023,
            isbn: "978-1-44-134170-9",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/pride_prejudice_cover.jpg",
            sinopsis: "Pride and Prejudice has charmed generations of readers for more than two centuries. Jane Austen's much-adapted novel is famed for its witty, spirited heroine, sensational romances, and deft remarks on the triumphs and pitfalls of social convention. Author Jane Austen (1775-1817) was an English novelist whose works of social realism achieved unprecedented critical and popular success, though Austen herself remained an anonymous writer throughout her life.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "The Lean Startup",
            penulis: "Eric Ries",
            penerbit: "Portfolio Penguin",
            tahun_terbit: 2011,
            isbn: "978-0-67-092160-7",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/the_lean_startup_cover.jpg",
            sinopsis: "Most new businesses fail. But most of those failures are preventable.The Lean Startup is a new approach to business that's being adopted around the world. It is changing the way companies are built and new products are launched. Essential reading for any ambitious entrepreneur, The Lean Startup will teach you to identify what your customers really want. You'll learn how to test your vision continuously, adapting and adjusting before it's too late.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 2 } }
        },
        {
            judul: "The Way of Kings",
            penulis: "Brandon Sanderson",
            penerbit: "Tor Books",
            tahun_terbit: 2010,
            isbn: "978-0-76-532635-5",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/the_way_of_kings_cover.jpg",
            sinopsis: "From #1 New York Times bestselling author Brandon Sanderson, The Way of Kings, book one of The Stormlight Archive begins an incredible new saga of epic proportion. Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter. It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them. One such war rages on a ruined landscape called the Shattered Plains. There, Kaladin, who traded his medical apprenticeship for a spear to protect his little brother, has been reduced to slavery. In a war that makes no sense, where ten armies fight separately against a single foe, he struggles to save his men and to fathom the leaders who consider them expendable. Brightlord Dalinar Kholin commands one of those other armies. Like his brother, the late king, he is fascinated by an ancient text called The Way of Kings. Troubled by over-powering visions of ancient times and the Knights Radiant, he has begun to doubt his own sanity. Across the ocean, an untried young woman named Shallan seeks to train under an eminent scholar and notorious heretic, Dalinar's niece, Jasnah. Though she genuinely loves learning, Shallan's motives are less than pure. As she plans a daring theft, her research for Jasnah hints at secrets of the Knights Radiant and the true cause of the war. The result of over ten years of planning, writing, and world-building, The Way of Kings is but the opening movement of the Stormlight Archive, a bold masterpiece in the making. Speak again the ancient oaths: Life before death. Strength before weakness. Journey before Destination. and return to men the Shards they once bore. The Knights Radiant must stand again.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "Structure and Interpretation of Computer Programs",
            penulis: "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
            penerbit: "MIT Press",
            tahun_terbit: 1996,
            isbn: "978-0-26-251087-5",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/computer_programs_cover.jpg",
            sinopsis: "Structure and Interpretation of Computer Programs has had a dramatic impact on computer science curricula over the past decade. This long-awaited revision contains changes throughout the text. There are new implementations of most of the major programming systems in the book, including the interpreters and compilers, and the authors have incorporated many small changes that reflect their experience teaching the course at MIT since the first edition was published. A new theme has been introduced that emphasizes the central role played by different approaches to dealing with time in computational models: objects with state, concurrent programming, functional programming and lazy evaluation, and nondeterministic programming. There are new example sections on higher-order procedures in graphics and on applications of stream processing in numerical programming, and many new exercises. In addition, all the programs have been reworked to run in any Scheme implementation that adheres to the IEEE standard.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 1 } }
        },
        {
            judul: "The Gene: An Intimate History",
            penulis: "Siddhartha Mukherjee",
            penerbit: "Simon and Schuster",
            tahun_terbit: 2016,
            isbn: "978-1-47-673352-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/the_gene_cover.jpg",
            sinopsis: "Spanning the globe and several centuries, The Gene is the story of the quest to decipher the master-code that makes and defines humans, that governs our form and function. The story of the gene begins in an obscure Augustinian abbey in Moravia in 1856 where a monk stumbles on the idea of a ‘unit of heredity’. It intersects with Darwin’s theory of evolution, and collides with the horrors of Nazi eugenics in the 1940s. The gene transforms post-war biology. It reorganizes our understanding of sexuality, temperament, choice and free will. This is a story driven by human ingenuity and obsessive minds – from Charles Darwin and Gregor Mendel to Francis Crick, James Watson and Rosalind Franklin, and the thousands of scientists still working to understand the code of codes. This is an epic, moving history of a scientific idea coming to life, by the author of The Emperor of All Maladies. But woven through The Gene, like a red line, is also an intimate history – the story of Mukherjee’s own family and its recurring pattern of mental illness, reminding us that genetics is vitally relevant to everyday lives. These concerns reverberate even more urgently today as we learn to “read” and “write” the human genome – unleashing the potential to change the fates and identities of our children. Majestic in its ambition, and unflinching in its honesty, The Gene gives us a definitive account of the fundamental unit of heredity – and a vision of both humanity’s past and future.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 9 } }
        },
        {
            judul: "The Power of Habit: Why We Do What We Do in Life and Business",
            penulis: "Charles Duhigg",
            penerbit: "Random House",
            tahun_terbit: 2012,
            isbn: "978-1-40-006928-6",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/habit_cover.jpg",
            sinopsis: "In 'The Power of Habit', award-winning 'New York Times' business reporter Charles Duhigg takes us to the thrilling edge of scientific discoveries that explain why habits exist and how they can be changed. With penetrating intelligence and an ability to distill vast amounts of information into engrossing narratives, Duhigg brings to life a whole new understanding of human nature and its potential for transformation. Along the way we learn why some people and companies struggle to change, despite years of trying, while others seem to remake themselves overnight. We visit laboratories where neuroscientists explore how habits work and where, exactly, they reside in our brains. We discover how the right habits were crucial to the success of Olympic swimmer Michael Phelps, Starbucks CEO Howard Schultz, and civil-rights hero Martin Luther King, Jr. We go inside Procter & Gamble, Target superstores, Rick Warren's Saddleback Church, NFL locker rooms, and the nation's largest hospitals and see how implementing so-called keystone habits can earn billions and mean the difference between failure and success, life and death. At its core, 'The Power of Habit' contains an exhilarating the key to exercising regularly, losing weight, raising exceptional children, becoming more productive, building revolutionary companies and social movements, and achieving success is understanding how habits work. Habits aren't destiny. As Charles Duhigg shows, by harnessing this new science, we can transform our businesses, our communities, and our lives.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 3 } }
        },
        {
            judul: "Zero to One: Notes on Startups, or How to Build the Future",
            penulis: "Peter Thiel, Blake Masters",
            penerbit: "Crown Currency",
            tahun_terbit: 2014,
            isbn: "978-0-80-413929-8",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/zero_to_one_cover.jpg",
            sinopsis: "If you want to build a better future, you must believe in secrets. The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. In Zero to One, legendary entrepreneur and investor Peter Thiel shows how we can find singular ways to create those new things. Thiel begins with the contrarian premise that we live in an age of technological stagnation, even if we’re too distracted by shiny mobile devices to notice. Information technology has improved rapidly, but there is no reason why progress should be limited to computers or Silicon Valley. Progress can be achieved in any industry or area of business. It comes from the most important skill that every leader must master: learning to think for yourself. Doing what someone else already knows how to do takes the world from 1 to n, adding more of something familiar. But when you do something new, you go from 0 to 1. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. Tomorrow’s champions will not win by competing ruthlessly in today’s marketplace. They will escape competition altogether, because their businesses will be unique. Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about innovation: it starts by learning to ask the questions that lead you to find value in unexpected places.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 2 } }
        },
        {
            judul: "Dune",
            penulis: "Frank Patrick Herbert",
            penerbit: "Chilton Books / Ace",
            tahun_terbit: 2019,
            isbn: "978-0-59-309932-2", // Menambahkan strip agar konsisten formatnya
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/dune_cover.jpg",
            sinopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for. When House Atreides is betrayed, the destruction of Paul’s family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad’Dib, he will bring to fruition humankind’s most ancient and unattainable dream.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "The Pragmatic Programmer: From Journeyman to Master",
            penulis: "Andy Hunt, Dave Thomas, Ward Cunningham",
            penerbit: "Addison-Wesley Professional",
            tahun_terbit: 1999,
            isbn: "978-0-20-161622-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/pragmatic_programmer_cover.jpg",
            sinopsis: "charlie Gordon is about to embark upon an unprecedented journey. Born with an unusually low IQ, he has been chosen as the perfect subject for an experimental surgery that researchers hope will increase his intelligence – a procedure that has already been highly successful when tested on a lab mouse named Algernon. As the treatment takes effect, Charlie's intelligence expands until it surpasses that of the doctors who engineered his metamorphosis. The experiment appears to be a scientific breakthrough of paramount importance, until Algernon suddenly deteriorates. Will the same happen to Charlie?",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 5 } }
        },
        {
            judul: "Gödel, Escher, Bach: An Eternal Golden Braid",
            penulis: "Douglas R. Hofstadter",
            penerbit: "Basic Books",
            tahun_terbit: 1999,
            isbn: "978-0-46-502656-2",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/godel_escher_cover.jpg",
            sinopsis: "Douglas Hofstadter's book is concerned directly with the nature of “maps” or links between formal systems. However, according to Hofstadter, the formal system that underlies all mental activity transcends the system that supports it. If life can grow out of the formal chemical substrate of the cell, if consciousness can emerge out of a formal system of firing neurons, then so too will computers attain human intelligence. Gödel, Escher, Bach is a wonderful exploration of fascinating ideas at the heart of cognitive science: meaning, reduction, recursion, and much more.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 8 } }
        },
        {
            judul: "Meditations",
            penulis: "Marcus Aurelius, Aaron Poochigian (Translator)",
            penerbit: "Liveright Publishing Corporation",
            tahun_terbit: 2026,
            isbn: "978-1-32-409639-9",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/meditations_cover.jpg",
            sinopsis: "Written in Greek, without any intention of publication, by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius (AD 121-180) offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. Ranging from doubt and despair to conviction and exaltation, they cover such diverse topics as the nature of moral virtue, human rationality, divine providence, and Marcus' own emotions. But while the Meditations were composed to provide personal consolation and encouragement, in developing his beliefs Marcus Aurelius also created one of the greatest of all works of a timeless collection of extended meditations and short aphorisms that has been consulted and admired by statesmen, thinkers and readers through the centuries.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 10 } }
        },
        {
            judul: "Flowers for Algernon",
            penulis: "Daniel Keyes",
            penerbit: "Houghton Mifflin Harcourt",
            tahun_terbit: 2004,
            isbn: "978-0-15-603008-3",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/flowers_algernon_cover.jpg",
            sinopsis: "Charlie Gordon is about to embark upon an unprecedented journey. Born with an unusually low IQ, he has been chosen as the perfect subject for an experimental surgery that researchers hope will increase his intelligence – a procedure that has already been highly successful when tested on a lab mouse named Algernon. As the treatment takes effect, Charlie's intelligence expands until it surpasses that of the doctors who engineered his metamorphosis. The experiment appears to be a scientific breakthrough of paramount importance, until Algernon suddenly deteriorates. Will the same happen to Charlie?",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "The Gift of Therapy: An Open Letter to a New Generation of Therapists and Their Patients",
            penulis: "Irvin D. Yalom",
            penerbit: "HarperCollins",
            tahun_terbit: 2003,
            isbn: "978-0-06-093811-6",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/gift_therapy_cover.jpg",
            sinopsis: "Anyone interested in psychotherapy or personal growth will rejoice at the publication of The Gift of Therapy, a masterwork from one of today's most accomplished psychological thinkers. From his thirty-five years as a practicing psychiatrist and as an award-winning author, Irvin D. Yalom imparts his unique wisdom in The Gift of Therapy. This remarkable guidebook for successful therapy is, as Yalom remarks, 'an idiosyncratic mÉlange of ideas and techniques that I have found useful in my work. These ideas are so personal, opinionated, and occasionally original that the reader is unlikely to encounter them elsewhere. I selected the eighty-five categories in this volume randomly guided by my passion for the task rather than any particular order or system.' At once startlingly profound and irresistibly practical, Yalom's insights will help enrich the therapeutic process for a new generation of patients and counselors.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 3 } }
        },
        {
            judul: "The Little Prince",
            penulis: "Antoine de Saint-Exupéry, Richard Howard (Translator)",
            penerbit: "Houghton Mifflin Harcourt",
            tahun_terbit: 2000,
            isbn: "978-0-15-202398-0",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/little_prince_cover.jpg",
            sinopsis: "A pilot forced to land in the Sahara meets a little prince. The wise and enchanting stories the prince tells of his own planet with its three volcanoes and a haughty flower are unforgettable. A strange and wonderful parable for all ages, with super illustrations by the author.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "Bumi Manusia",
            penulis: "Pramoedya Ananta Toer",
            penerbit: "Lentera Dipantara",
            tahun_terbit: 2005,
            isbn: "978-9-79-973123-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/bumi_manusia_cover.jpg",
            sinopsis: "Roman Tetralogi Buru mengambil latar belakang dan cikal bakal nation Indonesia di awal abad ke-20. Dengan membacanya waktu kita dibalikkan sedemikian rupa dan hidup di era membibitnya pergerakan nasional mula-mula, juga pertautan rasa, kegamangan jiwa, percintaan, dan pertarungan kekuatan anonim para srikandi yang mengawal penyemaian bangunan nasional yang kemudian kelak melahirkan Indonesia modern. Roman bagian pertama; Bumi Manusia, sebagai periode penyemaian dan kegelisahan dimana Minke sebagai aktor sekaligus kreator adalah manusia berdarah priyayi yang semampu mungkin keluar dari kepompong kejawaannya menuju manusia yang bebas dan merdeka, di sudut lain membelah jiwa ke-Eropa-an yang menjadi simbol dan kiblat dari ketinggian pengetahuan dan peradaban. Pram menggambarkan sebuah adegan antara Minke dengan ayahnya yang sangat sentimentil: Aku mengangkat sembah sebagaimana biasa aku lihat dilakukan punggawa terhadap kakekku dan nenekku dan orangtuaku, waktu lebaran. Dan yang sekarang tak juga kuturunkan sebelum Bupati itu duduk enak di tempatnya. Dalam mengangkat sembah serasa hilang seluruh ilmu dan pengetahuan yang kupelajari tahun demi tahun belakangan ini. Hilang indahnya dunia sebagaimana dijanjikan oleh kemajuan ilmu .... Sembah pengagungan pada leluhur dan pembesar melalui perendahan dan penghinaan diri! Sampai sedatar tanah kalau mungkin! Uh, anak-cucuku tak kurelakan menjalani kehinaan ini.'Kita kalah, Ma,' bisikku. 'Kita telah melawan, Nak, Nyo, sebaik-baiknya, sehormat-hormatnya.'",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 11 } }
        },
        {
            judul: "Code Complete: A Practical Handbook of Software Construction",
            penulis: "Steve McConnell",
            penerbit: "Microsoft Press",
            tahun_terbit: 2004,
            isbn: "978-0-73-561967-8",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/code_complete_cover.jpg",
            sinopsis: "Widely considered one of the best practical guides to programming, Steve McConnell’s original code complete has been helping developers write better software for more than a decade. Now this classic book has been fully updated and revised with leading-edge practices—and hundreds of new code samples—illustrating the art and science of software construction. Capturing the body of knowledge available from research, academia, and everyday commercial practice, McConnell synthesizes the most effective techniques and must-know principles into clear, pragmatic guidance. No matter what your experience level, development environment, or project size, this book will inform and stimulate your thinking—and help you build the highest quality code.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 5 } }
        },
        {
            judul: "Understanding Media: The Extensions of Man",
            penulis: "Marshall McLuhan, Lewis H. Lapham",
            penerbit: "MIT Press",
            tahun_terbit: 1994,
            isbn: "978-0-26-263159-4",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/understanding_media_cover.jpg",
            sinopsis: "Terms and phrases such as 'the global village' and 'the medium is the message' are now part of the lexicon, and McLuhan's theories continue to challenge our sensibilities and our assumptions about how and what we communicate. This reissue of Understanding Media marks the thirtieth anniversary (1964-1994) of Marshall McLuhan's classic expose on the state of the then emerging phenomenon of mass media. Terms and phrases such as 'the global village' and 'the medium is the message' are now part of the lexicon, and McLuhan's theories continue to challenge our sensibilities and our assumptions about how and what we communicate. There has been a notable resurgence of interest in McLuhan's work in the last few years, fueled by the recent and continuing conjunctions between the cable companies and the regional phone companies, the appearance of magazines such as WiRed, and the development of new media models and information ecologies, many of which were spawned from MIT's Media Lab. In effect, media now begs to be redefined. In a new introduction to this edition of Understanding Media, Harper's editor Lewis Lapham reevaluates McLuhan's work in the light of the technological as well as the political and social changes that have occurred in the last part of this century.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 4 } }
        },
        {
            judul: "Manufacturing Consent: The Political Economy of the Mass Media",
            penulis: "Edward S. Herman, Noam Chomsky",
            penerbit: "Knopf Doubleday Publishing Group",
            tahun_terbit: 2002,
            isbn: "978-0-37-571449-8",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/manufacturing_consent_cover.jpg",
            sinopsis: "A Powerful Assessment of How the U.S. Mass Media Fail to Provide the Kind of Information That We Need to Understand the World In this pathbreaking work, Edward S. Herman and Noam Chomsky show that, contrary to the usual image of the news media as cantankerous, obstinate, and ubiquitous in their search for truth and defense of justice, in their actual practice they defend the economic, social, and political agendas of the privileged groups that dominate domestic society, the state, and the global order. Based on a series of case studies—including the media’s dichotomous treatment of “worthy” versus “unworthy” victims, “legitimizing” and “meaningless” Third World elections, and devastating critiques of media coverage of the U.S. wars against Indochina—Herman and Chomsky draw on decades of criticism and research to propose a Propaganda Model to explain the media’s behavior and performance. Their new introduction updates the Propaganda Model and the earlier case studies, and it discusses several other applications. These include the manner in which the media covered the passage of the North American Free Trade Agreement and subsequent Mexican financial meltdown of 1994-1995, the media’s handling of the protests against the World Trade Organization, World Bank, and International Monetary Fund in 1999 and 2000, and the media’s treatment of the chemical industry and its regulation. What emerges from this work is a powerful assessment of how propagandistic the U.S. mass media are, how they systematically fail to live up to their self-image as providers of the kind of information that people need to make sense of the world, and how we can understand their function in a radically new way.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 4 } }
        },
        {
            judul: "The Next Conversation: Argue Less, Talk More",
            penulis: "Jefferson Fisher",
            penerbit: "Penguin Group",
            tahun_terbit: 2025,
            isbn: "978-0-59-371872-8",
            stok: 5,
            cover_buku: "https://jzogibyphlutpsetdqga.supabase.co/storage/v1/object/public/cover_buku/next_conversation_cover.jpg",
            sinopsis: "From communication expert Jefferson Fisher, the definitive book on making your next conversation the one that changes everything No matter who you’re talking to, The Next Conversation gives you immediately actionable strategies and phrases that will forever change how you communicate. Jefferson Fisher, trial lawyer and one of the leading voices on real-world communication, offers a tried-and-true framework that will show you how to transform your life and your relationships by improving your next conversation. Fisher has gained millions of followers through short, simple, practical videos teaching people how to argue less and talk more. Whether it’s handling a heated conversation, dealing with a difficult personality, or standing your ground with confidence, his down-to-earth teachings have helped countless people navigate life’s toughest situations. Now for the first time, Fisher has distilled his three-part communication system (Say it with control, Say it with confidence, Say it to connect) that can easily be applied to any situation. You will learn: Why you should never “win” an argument, How to assert yourself and communicate with intention, How to set boundaries and frame conversations, Why saying less is often more and How to overcome conflict with connection. The Next Conversation will give you practical phrases that will lead to powerful results, from breaking down defensiveness in a hard talk with a family member to finding your own assertive voice at the boardroom conference table. Your every word matters, and by controlling how you communicate every day, you will create waves of positive impact that will resonate throughout your relationships to last a lifetime. Everything you want to say, and how you want to say it, can be found in The Next Conversation.",
            rating_rata: 0,
            kategori: { connect: { id_kategori: 4 } }
        }
    ];

    console.log("Menyimpan data buku beserta fisik (barcode) otomatis...");

    for (const book of booksData) {
        // Bersihkan ISBN dari strip (-) agar kode lebih rapi dan ringkas
        const cleanIsbn = book.isbn.replace(/-/g, '');

        // Generate fisik buku (BukuItem) sesuai jumlah stok
        const generatedItems = [];
        for (let i = 1; i <= book.stok; i++) {
            const urutan = String(i).padStart(3, '0'); // 001, 002, dst
            
            generatedItems.push({
                kode_buku: `${cleanIsbn}-${urutan}`, // Sesuai dengan db.VarChar(50) di schema
                asal_perolehan: "PEMBELIAN AWAL"
            });
        }

        await prisma.buku.upsert({
            where: { isbn: book.isbn },
            update: {}, // Jika buku sudah ada, lewati agar fisik bukunya tidak ter-generate dobel
            create: {
                ...book,
                items: {
                    create: generatedItems
                }
            },
        });
    }

    console.log("Seeding selesai dengan sukses!");
}

main()
    .catch((e) => {
        console.error("Terjadi kesalahan saat eksekusi seeder:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });