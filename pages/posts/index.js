import * as MyFirstPost from './my-first-post';

const posts = [MyFirstPost];

export const metaData = posts.map(post => post.metaData);
