import qbs

CppApplication {
    consoleApplication: true
    files: [
        "index.md",
        "keyip.cpp",
        "main.cpp",
    ]

    Group {     // Properties for the produced executable
        fileTagsFilter: "application"
        qbs.install: true
        qbs.installDir: "bin"
    }
}
