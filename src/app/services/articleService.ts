import {db} from "../firebase/config"
import { DocumentReference, FieldValue, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { loadFromCache } from "./utils"

let sectionCache = null;
let articleCache: Article[] = []

export type Article = {
    id: string
    title: string,
    description: string,
    tags: string[],
    content: string,
    sponsor?: {
        name: string,
        imageUrl: string 
    }
}

export type Section = {
    id: string,
    index: number,
    title: string,
    description: string,
    articles: DocumentReference[]
}

//for admin
export async function createSection(section: Section) {
    let ref = doc(db, "sections/"+section.id)
    await setDoc(ref, section, {merge: true})
}

export async function createArticle(article: Article, section_id: string) {
    let ref = doc(db, "articles/"+article.id)
    
    await setDoc(ref, article, {merge: true})
    await updateDoc(doc(db, "sections/"+section_id), {
        articles: arrayUnion(ref)
    })
}

export async function getSections(): Promise<Section[]> {
    if(sectionCache) {
        return sectionCache
    }

    const sectionsRef = collection(db, "sections")
    
    const sections = await getDocs(sectionsRef)
    let result: Section[] = []

    sections.forEach(section => {
        const data = section.data()
        result.push({id: section.id, ...data} as Section)
    })

    if(!sectionCache) {
        sectionCache = result
    }

    return result
}

export async function getSection(sectionId: string): Promise<Section> {
    const sectionDoc = await getDoc(doc(db, "sections/"+sectionId))
    const sectionData = sectionDoc.data()

    return {id: sectionDoc.id, ...sectionData} as Section
}

export async function getAllArticles(): Promise<Article[]> {
    const articlesRef = collection(db, "articles")
    const articles = await getDocs(articlesRef)

    let result = [];
    
    articles.forEach(article => result.push({id: article.id, ...article.data()}))
    articleCache = result;

    return result;
}

export async function getArticleFromID(articleId: string): Promise<Article> {
    let cached = loadFromCache(articleCache, articleId)

    if(cached) {
        return cached;
    } else {
        const articleDoc = await getDoc(doc(db, "articles/"+articleId))
        if(articleDoc.data()) {
            let article: Article = {id: articleDoc.id, ...articleDoc.data()} as Article
            articleCache.push(article)
            return article;
        } else {
            throw new Error("Article not found!")
        }
    }
}

export async function getArticleFromRef(articleRef: DocumentReference): Promise<Article> {
    return getArticleFromID(articleRef.id)
}