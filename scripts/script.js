module.exports = async ({github, context}) => {
    let response = await github.rest.repos.listForOrg({
        org: "pypi-data",
        sort: "full_name",
    });

    return response.data.map(r => r.full_name)
}
