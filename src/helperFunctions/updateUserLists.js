import supabase from "../supabase/config";

async function markAsRead(book, getUpdatedList, updateComponent) {
  const { data, error } = await supabase.rpc("append_book_books_read", {
    user_id: 1, //Usuario 1 es nuestro único usuario
    new_item: Number(book.id),
  });

  if (error) {
    console.log("Error: ", error);
  } else { getUpdatedList(updateComponent); }
}

async function markAsUnread(book, getUpdatedList, updateComponent) {
  const { data, error } = await supabase.rpc("remove_book_books_read", {
    user_id: 1, //Usuario 1 es nuestro único usuario
    item_to_remove: Number(book.id),
  });
  if (error) {
    console.log("Error: ", error);
  } else { getUpdatedList(updateComponent); }
}

async function addToList(book, getUpdatedList, updateComponent) {
  const {data, error} = await supabase.rpc("append_book_books_to_read", {
    user_id: 1,
    new_item: Number(book.id)
  });
  if (error) {
    console.log("Error: ", error);
  } else{ getUpdatedList(updateComponent); }

}
async function removeFromList(book, getUpdatedList, updateComponent) {
  const {data, error} = await supabase.rpc("remove_book_books_to_read", {
    user_id: 1,
    item_to_remove: Number(book.id)
  });
  if (error) {
    console.log("Error: ", error);
  } else { getUpdatedList(updateComponent); }
}

export { markAsRead, markAsUnread, addToList, removeFromList };
