import {db} from "../firebase/config"
import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import { loadFromCache } from "./utils"

let sectionCache = null;
let articleCache = []

export async function getSections() {
    if(sectionCache) {
        return sectionCache
    }

    const sectionsRef = collection(db, "sections")
    
    const sections = await getDocs(sectionsRef)
    let result = []

    sections.forEach(section => {
        const data = section.data()
        result.push({id: section.id, ...data})
    })

    if(!sectionCache) {
        sectionCache = result
    }

    return result
}

export async function getSection(sectionId) {
    const sectionDoc = await getDoc(doc(db, "sections/"+sectionId))
    const sectionData = sectionDoc.data()

    return {id: secitonDoc.id, ...sectionData}
}

export async function getAllArticles() {
    const articlesRef = collection(db, "articles")
    const articles = await getDocs(articlesRef)

    let result = [];
    
    articles.forEach(article => result.push({id: article.id, ...article.data()}))
    articleCache = result;

    return result;
}

export async function getArticleFromID(articleId) {
    let cached = loadFromCache(articleCache, articleId)

    if(cached) {
        return cached;
    } else {
        const articleDoc = await getDoc(doc(db, "articles/"+articleId))
        articleCache.push({id: articleDoc.id, ...articleDoc.data()})
        return articleDoc.data();
    }
}

export async function getArticleFromRef(articleRef) {
    let cached = loadFromCache(articleCache, articleRef.id)
    if(cached) {
        return cached
    } else {
        const articleDoc = await getDoc(articleRef)
        articleCache.push({id: article.id, ...articleDoc.data()})
        return articleDoc.data()
    }
}