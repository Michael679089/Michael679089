// Source - https://stackoverflow.com/a/56352956
// Posted by kyun
// Retrieved 2026-02-11, License - CC BY-SA 4.0

import React, { useState, useEffect } from 'react';




export async function RepoList() {
    const repoUserName = "Michael679089";
    const [arrayItems, setArrayItems] = useState([]);
    const repoURL = `https://api.github.com/users/${repoUserName}/repos`;

    useEffect(async () => {
        await fetch(repoURL)
            .then(response => response.json())
            .then(data => {
                const items = data.map((arraySingleItem) => {
                    return (
                        <RepoListItem
                            arrayID={arraySingleItem.id}
                            key={arraySingleItem.id}
                            fullName={arraySingleItem.full_name}
                        />
                    );
                });
                setArrayItems(items);
            })

    }, []);

    return (
        <ul>
            <h4>Repos</h4>
            <a href={repoURL} className="embed-responsive-item">{repoURL}</a>
            <br />
            <br />
            <h3>List of repositories</h3>
            {arrayItems}

        </ul>
    );
}

