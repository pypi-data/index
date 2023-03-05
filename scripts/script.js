module.exports = async ({github, fetch}) => {
    let response = await github.rest.repos.listForOrg({
        org: "pypi-data",
        sort: "full_name",
    });

    let repo_names = response.data.map(r => r.full_name).filter(name => name.startsWith("pypi-data/pypi-code-")).map(name => name.split('/')[1]);

    let indexes = [];
    for (const idx in repo_names) {
        let name = repo_names[idx];
        let response = await github.rest.repos.getContent({
            owner: "pypi-data",
            repo: name,
            path: "index.json",
        });
        let content = await fetch(response.data.download_url);
        console.log(name);
        console.log(content);
    }
}
