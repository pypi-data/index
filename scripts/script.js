const fs = require('fs');

module.exports = async ({github, fetch}) => {
    const opts = github.rest.repos.listForOrg.endpoint.merge({
        org: "pypi-data",
        sort: "full_name",
        per_page: 100
    })
    let response = await github.paginate(opts);

    let repo_names = response.map(r => r.full_name).filter(name => name.startsWith("pypi-data/pypi-code-"));

    for (const idx in repo_names) {
        let name = repo_names[idx];
        let response = await fetch(`https://raw.githubusercontent.com/${name}/main/index.json`);
        let content = await response.json();
        console.log(name);
        // console.log(content);
        let count = Object.values(content.entries).reduce((a, v) => a + v.length, 0);
        let output = {
            url: content.url,
            earliest_release: content.earliest_release,
            latest_release: content.latest_release,
            count
        }
        let short_name = name.split('/')[1]
        fs.writeFileSync(`partitions/${short_name}.json`, JSON.stringify(output));
        console.log(output);
    }
}
