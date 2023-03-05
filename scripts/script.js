module.exports = async ({github, context}) => {
    return await github.rest.repos.listForOrg({
        org: "pypi-data",
        sort: "full_name",
    });
}