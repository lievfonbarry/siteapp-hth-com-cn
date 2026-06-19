// assets/content-map.js
// 维护站点内容分区、关键词标签和简单的搜索过滤函数

const siteName = "华体会";
const baseUrl = "https://siteapp-hth.com.cn";

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["华体会", "首页", "导航"],
    content: "欢迎来到华体会，提供丰富的体育赛事和游戏体验。"
  },
  {
    id: "sports",
    title: "体育赛事",
    tags: ["华体会", "体育", "足球", "篮球", "网球"],
    content: "涵盖足球、篮球、网球等主流体育赛事直播与投注。"
  },
  {
    id: "casino",
    title: "真人娱乐",
    tags: ["华体会", "真人", "娱乐场", "百家乐"],
    content: "真人荷官直播，感受身临其境的娱乐场体验。"
  },
  {
    id: "slots",
    title: "电子游戏",
    tags: ["华体会", "电子", "老虎机", "街机"],
    content: "数百款热门电子游戏，经典与创新并存。"
  },
  {
    id: "promotions",
    title: "优惠活动",
    tags: ["华体会", "优惠", "活动", "奖励"],
    content: "最新优惠活动，注册即享丰厚奖励。"
  },
  {
    id: "help",
    title: "帮助中心",
    tags: ["华体会", "帮助", "客服", "FAQ"],
    content: "常见问题解答与客服支持，随时为您服务。"
  },
  {
    id: "about",
    title: "关于我们",
    tags: ["华体会", "关于", "公司简介"],
    content: "华体会致力于为全球用户提供优质的线上娱乐服务。"
  }
];

/**
 * 根据关键词数组搜索匹配的内容分区
 * @param {string[]} keywords - 搜索关键词数组
 * @param {string} [searchField='tags'] - 搜索字段：'tags' 或 'title' 或 'content'
 * @returns {object[]} 匹配的分区对象数组
 */
function searchSections(keywords, searchField = "tags") {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return [];
  }

  const lowerKeywords = keywords.map(k => k.toLowerCase().trim());

  return contentSections.filter(section => {
    let target;
    if (searchField === "tags") {
      target = section.tags.join(" ").toLowerCase();
    } else if (searchField === "title") {
      target = section.title.toLowerCase();
    } else if (searchField === "content") {
      target = section.content.toLowerCase();
    } else {
      target = (section.title + " " + section.tags.join(" ") + " " + section.content).toLowerCase();
    }

    return lowerKeywords.every(kw => target.includes(kw));
  });
}

/**
 * 获取所有标签（去重排序）
 * @returns {string[]} 所有唯一标签的数组
 */
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * 通过分区ID获取内容
 * @param {string} id - 分区ID
 * @returns {object|null} 匹配的分区对象，未找到返回null
 */
function getSectionById(id) {
  return contentSections.find(section => section.id === id) || null;
}

// 示例用法（可移除，仅演示）
// console.log("所有标签:", getAllTags());
// console.log("搜索 '体育':", searchSections(["体育"]));
// console.log("搜索 '华体会 优惠':", searchSections(["华体会", "优惠"]));
// console.log("搜索标题含 '帮助':", searchSections(["帮助"], "title"));
// console.log("ID 'slots':", getSectionById("slots"));

// 导出模块（如果使用Node.js环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentSections,
    searchSections,
    getAllTags,
    getSectionById,
    siteName,
    baseUrl
  };
}