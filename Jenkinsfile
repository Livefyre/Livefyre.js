livefyre('''
deploy:
  branch: "^(rc|staging|production)$"
  confirm: true
  commands:
    - make clean dist
  lfcdn:
    build: ${currentBuild.startTimeInMillis}
''')
