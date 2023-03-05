module.exports = ({github, context}) => {
    return github.rest.repos.listForOrg({
        org: "pypi-data",
        sort: "full_name",
    });
}