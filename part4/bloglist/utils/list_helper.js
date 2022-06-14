const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reduceHelper = (prev, cur) => {
        return prev + (cur.likes || 0);
    };

    return blogs.reduce(reduceHelper, 0);
};

const favoriteBlog = (blogs) => {
    const maxNumber = Math.max(...blogs.map((blog) => blog.likes));
    const topBlog = blogs.filter((blog) => blog.likes === maxNumber);

    return topBlog.length
        ? {
              title: topBlog[0].title,
              author: topBlog[0].author,
              likes: topBlog[0].likes,
          }
        : null;
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0;
    let authors = {};
    for (let i = 0; i < blogs.length; i++) {
        if (authors[blogs[i].author]) {
            authors[blogs[i].author]++;
        } else {
            authors[blogs[i].author] = 1;
        }
    }

    let most = Math.max(...Object.values(authors));

    let author = Object.keys(authors).find((p) => authors[p] === most);

    return {
        author,
        blogs: most,
    };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    let authors = {};
    for (let i = 0; i < blogs.length; i++) {
        if (authors[blogs[i].author]) {
            authors[blogs[i].author] += blogs[i].likes;
        } else {
            authors[blogs[i].author] = blogs[i].likes;
        }
    }

    let most = Math.max(...Object.values(authors));

    let author = Object.keys(authors).find((p) => authors[p] === most);

    return {
        author,
        likes: most,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
