import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Proccessing seeding...");

    // Seed kategori dulu, tangkap id-nya
    const fiksi = await prisma.kategori.upsert({
        where: { id_kategori: 1 },
        update: {},
        create: {
            nama_kategori: "Fiksi",
            deskripsi: "Kategori untuk buku-buku fiksi yang mencakup berbagai genre seperti novel, cerita pendek, fantasi, dan lain-lain."
        },
    });

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
            rating_rata: 4.5,
            kategori: { connect: { id_kategori: fiksi.id_kategori } }
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
            rating_rata: 4.5,
            kategori: { connect: { id_kategori: fiksi.id_kategori } }
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
            rating_rata: 4.5,
            kategori: { connect: { id_kategori: fiksi.id_kategori } }
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
            rating_rata: 4.5,
            kategori: { connect: { id_kategori: fiksi.id_kategori } }
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
            rating_rata: 4.5,
            kategori: { connect: { id_kategori: fiksi.id_kategori } }
        },
    ];

    for (const book of booksData) {
        await prisma.buku.upsert({
            where: { isbn: book.isbn },
            update: {},
            create: book,
        });
    }

    console.log("Seeding selesai!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });