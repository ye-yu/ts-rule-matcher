interface MatchingRule {
  column: string,
  values: string[]
}

interface Rule {
  name?: string,
  matches: string | MatchingRule[],
  data: string
}

interface RuleData {
  [key: string]: any
}

export default class RuleMatcher {
  private rules: Rule[]
  private data: RuleData

  constructor(ruleObject: any) {
    this.rules = ruleObject.rules
    this.data = ruleObject.data
  }

  public match(object: any) {
    const matchedRule = this.rules.find((e: Rule) => {
      if (e.matches instanceof Array) {
        return e.matches.find((m: MatchingRule) => m.values.indexOf(object[m.column]) > -1)
      } else {
        return e.matches === "all"
      }
    })

    return matchedRule ? this.data[matchedRule.data] : undefined
  }
}
