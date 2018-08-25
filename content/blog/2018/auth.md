+++
title = "Authentication and authorization"
tags = [ "programming", "security", "authentication", "authorization" ]
date = "2018-03-11T19:24:00+02:00"
slug = "auth"
+++

> Be yourself; everyone else is already taken. _(Oscar Wilde)_

.. or else, how to build identity and access restrictions inside your app.

# TOC

* [Definition](#definition)
* [Providers](#providers)

----

# Definition

* **Authentication** is the process of verifying who you are. When you log on to a PC with a user name and password you are authenticating. **[= login + password (who you are)]**
* **Authorization** is the process of verifying that you have access to something. Gaining access to a resource (e.g. directory on a hard disk) because the permissions configured on it allow you access is authorization. **[= permissions (what you are allowed to do)]**

Source: [1](https://serverfault.com/questions/57077/what-is-the-difference-between-authentication-and-authorization), [2](https://stackoverflow.com/questions/6556522/authentication-versus-authorization)

# Providers

|  Provider                                                                   | From | Protocols            | Purpose                                             | CVEs (2018-03) |
|-----------------------------------------------------------------------------|------|----------------------|-----------------------------------------------------|----------------|
| [OAuth2](https://en.wikipedia.org/wiki/OAuth#OAuth_2.0)                     | 2012 | JSON, HTTP           | API authorization between applications              | 39 (+ v1)      |
| [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)                         | 2015 | JSON, HTTP           | Token verifying identity                            | 9              |
| [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)    | 2001 | SAM, XML, HTTP, SOAP | Single sign-on for enterprise users                 | 56             |
| [OpenID](https://en.wikipedia.org/wiki/OpenID)                              | 2005 | XRDS, HTTP           | Single sign-on for consumers in an open environment | 49             |
| [Kerberos](https://en.wikipedia.org/w/index.php?oldid=824622869)            | 1980 | UDP                  | Single sign-on in controlled environment            | 228            |

Source: [1](https://www.softwaresecured.com/federated-identities-openid-vs-saml-vs-oauth/), [2](https://spin.atomicobject.com/2016/05/30/openid-oauth-saml/), [3](https://security.stackexchange.com/questions/5141/how-does-openid-implement-single-sign-on), [4](https://www.owasp.org/index.php/REST_Security_Cheat_Sheet)