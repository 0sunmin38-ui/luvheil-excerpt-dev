require(process.argv[2] === 'followup' ? './followup.cjs' : process.argv[2] === 'screenshots' ? './screenshots.cjs' : './audit.cjs');
