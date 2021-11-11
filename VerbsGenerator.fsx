open System.IO

#r "nuget: Newtonsoft.Json"
open Newtonsoft.Json
open Newtonsoft.Json.Linq

#r "nuget: FSharp.Data"
open FSharp.Data


let verbsPath = "C:/Path/To/Verbs.json"

type WordData =
    { Name: string
      Definitions: string seq
      Examples: string seq }

type VerbData =
    { Base: WordData
      PastSimple: WordData
      PastParticiple: WordData }

let rec clearText (text: string) =
    let removeFrom = "{"
    let removeTo = "}"
    let fromIndex = text.IndexOf(removeFrom)
    let toIndex = text.IndexOf(removeTo)
    if fromIndex = -1 then text
    else
        let count = toIndex - fromIndex + 1
        clearText (text.Remove(fromIndex, count))

let getDefinitionsAndExamples word =
    let dictionaryapiUrl = "https://dictionaryapi.com/api/v3/references/learners/json"
    let dictionaryapiKey = "DICTIONARY-API-KEY"
    let json = 
        Http.RequestString
            ( $"{dictionaryapiUrl}/{word}", httpMethod = "GET",
                query   = [ "key", dictionaryapiKey; ],
                headers = [ "Accept", "application/json" ])
        |> JsonConvert.DeserializeObject<JArray>
    let definitions = json.[0].["meta"].["app-shortdef"].["def"].Values<string>()
    let examples =
        json.[0].["dros"].[0].["def"].[0].["sseq"].[0].[0].[1].["dt"].[1].[1].Values<JToken>()
        |> Seq.map (fun jt -> jt.Value<string>("t"))
        |> Seq.map (fun example -> clearText example)
    (definitions, examples)

let getWordData word =
    let (definitions, examples) = getDefinitionsAndExamples word
    { Name = word; Definitions = definitions; Examples = examples }

let getVerbData base' pastSimple pastParticiple =
    { Base = getWordData base'; PastSimple = getWordData pastSimple; PastParticiple = getWordData pastParticiple }

let generateVerbsJson =
    let jObj =
        File.ReadAllText(verbsPath)
        |> JsonConvert.DeserializeObject<Linq.JObject>
    jObj.["verbs"]
    |> Seq.map
        (fun v -> 
            let base' = v.Value<string>("Base")
            

            0)
    



let (definitions, examples) = getDefinitionsAndExamples "be"

printfn "Definitions:"
definitions
|> Seq.iter (fun d -> printfn "%s" d)

printfn "\nExamples:"
examples
|> Seq.iter (fun e -> printfn "%s" e)
