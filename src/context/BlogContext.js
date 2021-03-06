import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
    switch (action.type) {
        case "delete_blogpost":
            return state.filter(
                (blogPost) => blogPost.id !== action.payload
            );
        case "add_blogpost":
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content,
                },
            ];
        case "edit_blogpost":
            return state.map((blogPost) => {
                // ternary operator kullanılabilr
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({
            type: "add_blogpost",
            payload: { title: title, content: content },
        });
        callback();
    };
};

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({
            type: "edit_blogpost",
            payload: { id: id, title: title, content: content },
        });
        callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: "delete_blogpost", payload: id });
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    []
);
