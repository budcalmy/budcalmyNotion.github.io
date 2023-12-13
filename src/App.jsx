import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Registration from "./routes/Registration";
import LogIn from "./routes/LogIn";
import Footer from "./Footer";
import RequireAuth from "./components/RequireAuth";
import Header from "./Header";
import Notes from "./routes/Notes";
import NoteEdit from "./routes/NoteEdit";
import NoteInfo from "./routes/NoteInfo";
import NoteCreator from "./routes/NoteCreator";
import ErrorPage from "./routes/ErrorPage";

// import { loader as notesLoader } from "./routes/Notes";
import { loader as currentNoteLoader } from "./routes/NoteInfo";
import { loader as editNoteLoader } from "./routes/NoteEdit";

import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Footer />,
    children: [
      {
        path: "/reg",
        element: <Registration />,
      },
      {
        path: "/",
        element: <LogIn />,
      },
      {
        path: "/:userID",
        element: (
          <RequireAuth>
            <Header></Header>
          </RequireAuth>
        ),
        children: [
          {
            path: "/:userID/home",
            element: <Home></Home>,
          },
          {
            path: "/:userID/notes",
            element: <Notes></Notes>,
          },
          {
            path: "/:userID/notes/edit/:noteID",
            loader: editNoteLoader,
            element: <NoteEdit></NoteEdit>,
          },
          {
            path: "/:userID/notes/create",
            loader: editNoteLoader,
            element: <NoteCreator></NoteCreator>,
          },
          {
            path: `/:userID/notes/:noteID`,
            loader: currentNoteLoader,
            element: <NoteInfo></NoteInfo>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loaading....</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
