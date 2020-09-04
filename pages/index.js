import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react";

HomePage.getInitialProps = async ({ req, query }) => {
    let protocol, host = '';

    if (process.env.NODE_ENV !== 'development') {
        protocol = req?`${req.headers['x-forwarded-proto']}:`: location.protocol
        host = req ? req.headers['x-forwarded-host'] : location.host
    } else {
        protocol = 'http:'
        host = '127.0.0.1:3000'
    }

    const pageRequest = `${protocol}//${host}/api/todo/todos`
    const res = await fetch(pageRequest)
    const json = await res.json()
    return json
}

export default function HomePage({ todos }) {
    if (todos?.error) {
        throw new Error("An error has occurred")
    }

    todos = todos.map((todo) =>
        <li key={todo.id}>{todo.content}</li>
    )

    return (
        <div className={styles.container}>
            <Head>
                <title>Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Todo List</h1>

            <ul>
                {todos}
            </ul>
        </div>
    )
}
